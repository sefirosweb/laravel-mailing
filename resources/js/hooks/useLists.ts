import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    attachGroupToList,
    attachUserToList,
    createList,
    deleteList,
    detachGroupFromList,
    detachUserFromList,
    fetchAllGroupsForSelector,
    fetchAllUsersForSelector,
    fetchListGroups,
    fetchLists,
    fetchListUsers,
    updateList,
} from '@/api/lists';
import { Group, Id, ListPayload, ListStatus, User } from '@/types/store';

const listsKey = (status: ListStatus = 'active') =>
    ['lists', status] as const;
const listUsersKey = (id: Id) => ['lists', id, 'users'] as const;
const listGroupsKey = (id: Id) => ['lists', id, 'groups'] as const;

export const useLists = (status: ListStatus = 'active') =>
    useQuery({
        queryKey: listsKey(status),
        queryFn: () => fetchLists(status),
    });

export const useListUsers = (listId: Id | null) =>
    useQuery({
        queryKey: listUsersKey(listId ?? 0),
        queryFn: () => fetchListUsers(listId as Id),
        enabled: listId != null,
    });

export const useListGroups = (listId: Id | null) =>
    useQuery({
        queryKey: listGroupsKey(listId ?? 0),
        queryFn: () => fetchListGroups(listId as Id),
        enabled: listId != null,
    });

export const useAllUsers = () =>
    useQuery({
        queryKey: ['users-selector'],
        queryFn: fetchAllUsersForSelector,
        staleTime: 30_000,
    });

export const useAllGroupsForSelector = () =>
    useQuery({
        queryKey: ['groups-selector'],
        queryFn: fetchAllGroupsForSelector,
        staleTime: 30_000,
    });

export const useCreateList = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: ListPayload) => createList(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['lists'] }),
    });
};

export const useUpdateList = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: Id; payload: ListPayload }) =>
            updateList(id, payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['lists'] }),
    });
};

export const useDeleteList = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: Id) => deleteList(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['lists'] }),
    });
};

export const useToggleListUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            listId,
            userId,
            attach,
        }: {
            listId: Id;
            userId: Id;
            attach: boolean;
        }) =>
            attach
                ? attachUserToList(listId, userId)
                : detachUserFromList(listId, userId),

        onMutate: async ({ listId, userId, attach }) => {
            await qc.cancelQueries({ queryKey: listUsersKey(listId) });
            const previous = qc.getQueryData<User[]>(listUsersKey(listId));

            qc.setQueryData<User[]>(listUsersKey(listId), (prev = []) => {
                if (attach) {
                    if (prev.some((u) => u.id === userId)) return prev;
                    const fromSelector = (
                        qc.getQueryData<(User & { value: Id })[]>([
                            'users-selector',
                        ]) ?? []
                    ).find((u) => u.id === userId);
                    return fromSelector
                        ? [...prev, fromSelector]
                        : [...prev, { id: userId, name: '' } as User];
                }
                return prev.filter((u) => u.id !== userId);
            });

            return { previous };
        },

        onError: (_err, { listId }, ctx) => {
            if (ctx?.previous) {
                qc.setQueryData(listUsersKey(listId), ctx.previous);
            }
        },

        onSettled: (_data, _err, { listId }) => {
            qc.invalidateQueries({ queryKey: listUsersKey(listId) });
            qc.invalidateQueries({ queryKey: ['lists'] });
        },
    });
};

export const useToggleListGroup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            listId,
            groupId,
            attach,
        }: {
            listId: Id;
            groupId: Id;
            attach: boolean;
        }) =>
            attach
                ? attachGroupToList(listId, groupId)
                : detachGroupFromList(listId, groupId),

        onMutate: async ({ listId, groupId, attach }) => {
            await qc.cancelQueries({ queryKey: listGroupsKey(listId) });
            const previous = qc.getQueryData<Group[]>(listGroupsKey(listId));

            qc.setQueryData<Group[]>(listGroupsKey(listId), (prev = []) => {
                if (attach) {
                    if (prev.some((g) => g.id === groupId)) return prev;
                    const fromSelector = (
                        qc.getQueryData<(Group & { value: Id })[]>([
                            'groups-selector',
                        ]) ?? []
                    ).find((g) => g.id === groupId);
                    return fromSelector
                        ? [...prev, fromSelector]
                        : [
                              ...prev,
                              {
                                  id: groupId,
                                  name: '',
                                  to: '',
                                  description: null,
                              } as Group,
                          ];
                }
                return prev.filter((g) => g.id !== groupId);
            });

            return { previous };
        },

        onError: (_err, { listId }, ctx) => {
            if (ctx?.previous) {
                qc.setQueryData(listGroupsKey(listId), ctx.previous);
            }
        },

        onSettled: (_data, _err, { listId }) => {
            qc.invalidateQueries({ queryKey: listGroupsKey(listId) });
            qc.invalidateQueries({ queryKey: ['lists'] });
        },
    });
};
