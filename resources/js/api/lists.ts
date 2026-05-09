import { api } from './client';
import { Group, Id, List, ListPayload, ListStatus, User } from '@/types/store';

interface ListResponse<T> {
    success: boolean;
    data: T[];
}

interface SelectorUser extends User {
    value: Id;
}

interface SelectorGroup extends Group {
    value: Id;
}

export const fetchLists = async (
    status: ListStatus = 'active',
): Promise<List[]> => {
    const { data } = await api.get<ListResponse<List>>('/mailing_list', {
        params: status === 'active' ? undefined : { status },
    });
    return data.data;
};

export const createList = async (payload: ListPayload): Promise<void> => {
    await api.post('/mailing_list', payload);
};

export const updateList = async (
    id: Id,
    payload: ListPayload,
): Promise<void> => {
    await api.put('/mailing_list', { mailing_lists_id: id, ...payload });
};

// DELETE toggles delete/restore on the backend.
export const deleteList = async (id: Id): Promise<void> => {
    await api.delete('/mailing_list', { data: { mailing_lists_id: id } });
};

// Users <-> List
export const fetchListUsers = async (listId: Id): Promise<User[]> => {
    const { data } = await api.get<ListResponse<User>>('/mailing_list/users', {
        params: { mailing_lists_id: listId },
    });
    return data.data;
};

export const fetchAllUsersForSelector = async (): Promise<SelectorUser[]> => {
    const { data } = await api.get<{ data: SelectorUser[] }>(
        '/mailing_list/users/get_array',
    );
    return data.data;
};

export const attachUserToList = async (
    listId: Id,
    userId: Id,
): Promise<void> => {
    await api.post('/mailing_list/users', {
        mailing_lists_id: listId,
        user_id: userId,
    });
};

export const detachUserFromList = async (
    listId: Id,
    userId: Id,
): Promise<void> => {
    await api.delete('/mailing_list/users', {
        data: { mailing_lists_id: listId, user_id: userId },
    });
};

// Groups <-> List
export const fetchListGroups = async (listId: Id): Promise<Group[]> => {
    const { data } = await api.get<ListResponse<Group>>(
        '/mailing_list/groups',
        { params: { mailing_lists_id: listId } },
    );
    return data.data;
};

export const fetchAllGroupsForSelector = async (): Promise<SelectorGroup[]> => {
    const { data } = await api.get<{ data: SelectorGroup[] }>(
        '/mailing_list/groups/get_array',
    );
    return data.data;
};

export const attachGroupToList = async (
    listId: Id,
    groupId: Id,
): Promise<void> => {
    await api.post('/mailing_list/groups', {
        mailing_lists_id: listId,
        mailing_groups_id: groupId,
    });
};

export const detachGroupFromList = async (
    listId: Id,
    groupId: Id,
): Promise<void> => {
    await api.delete('/mailing_list/groups', {
        data: { mailing_lists_id: listId, mailing_groups_id: groupId },
    });
};
