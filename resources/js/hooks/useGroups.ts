import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createGroup,
    deleteGroup,
    fetchGroups,
    updateGroup,
} from '@/api/groups';
import { GroupPayload, Id, ListStatus } from '@/types/store';

const groupsKey = (status: ListStatus = 'active') =>
    ['groups', status] as const;

export const useGroups = (status: ListStatus = 'active') =>
    useQuery({
        queryKey: groupsKey(status),
        queryFn: () => fetchGroups(status),
    });

export const useCreateGroup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: GroupPayload) => createGroup(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['groups'] });
            qc.invalidateQueries({ queryKey: ['groups-selector'] });
        },
    });
};

export const useUpdateGroup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: Id; payload: GroupPayload }) =>
            updateGroup(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['groups'] });
            qc.invalidateQueries({ queryKey: ['groups-selector'] });
        },
    });
};

export const useDeleteGroup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: Id) => deleteGroup(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['groups'] });
            qc.invalidateQueries({ queryKey: ['groups-selector'] });
            qc.invalidateQueries({ queryKey: ['lists'] });
        },
    });
};
