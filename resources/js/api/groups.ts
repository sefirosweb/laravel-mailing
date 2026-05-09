import { api } from './client';
import { Group, GroupPayload, Id, ListStatus } from '@/types/store';

interface ListResponse<T> {
    success: boolean;
    data: T[];
}

export const fetchGroups = async (
    status: ListStatus = 'active',
): Promise<Group[]> => {
    const { data } = await api.get<ListResponse<Group>>('/mailing_group', {
        params: status === 'active' ? undefined : { status },
    });
    return data.data;
};

export const createGroup = async (payload: GroupPayload): Promise<void> => {
    await api.post('/mailing_group', payload);
};

export const updateGroup = async (
    id: Id,
    payload: GroupPayload,
): Promise<void> => {
    await api.put('/mailing_group', { mailing_groups_id: id, ...payload });
};

// DELETE toggles delete/restore on the backend.
export const deleteGroup = async (id: Id): Promise<void> => {
    await api.delete('/mailing_group', { data: { mailing_groups_id: id } });
};
