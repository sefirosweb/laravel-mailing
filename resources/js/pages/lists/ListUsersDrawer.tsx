import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { Drawer } from '@/ui/Drawer';
import { RelationPicker } from '@/ui/RelationPicker';
import {
    useAllUsers,
    useListUsers,
    useToggleListUser,
} from '@/hooks/useLists';
import { useTrackedToggle } from '@/hooks/useTrackedToggle';
import { List } from '@/types/store';

interface Props {
    list: List | null;
    onClose: () => void;
}

export const ListUsersDrawer = ({ list, onClose }: Props) => {
    const { t } = useTranslation();
    const { data: assigned = [] } = useListUsers(list?.id ?? null);
    const { data: allUsers = [] } = useAllUsers();
    const toggleMut = useToggleListUser();
    const { pendingIds, trigger } = useTrackedToggle(toggleMut.mutateAsync);
    const selectedIds = assigned.map((u) => u.id);

    return (
        <Drawer
            open={!!list}
            onClose={onClose}
            title={
                list
                    ? `${t('lists.usersDrawer.titlePrefix')} ${list.name}`
                    : ''
            }
            subtitle={t('lists.usersDrawer.subtitle')}
            footer={
                <Button variant="primary" onClick={onClose}>
                    {t('common.done')}
                </Button>
            }
        >
            {list && (
                <RelationPicker
                    items={allUsers}
                    selectedIds={selectedIds}
                    pendingIds={pendingIds}
                    onToggle={(userId) =>
                        void trigger(userId, {
                            listId: list.id,
                            userId,
                            attach: !selectedIds.includes(userId),
                        })
                    }
                    getLabel={(u) => u.name}
                    getDescription={(u) => u.email}
                    getInitials={(u) => u.name}
                    emptyText={t('lists.usersDrawer.empty')}
                />
            )}
        </Drawer>
    );
};
