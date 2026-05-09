import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { Drawer } from '@/ui/Drawer';
import { RelationPicker } from '@/ui/RelationPicker';
import {
    useAllGroupsForSelector,
    useListGroups,
    useToggleListGroup,
} from '@/hooks/useLists';
import { useTrackedToggle } from '@/hooks/useTrackedToggle';
import { List } from '@/types/store';

interface Props {
    list: List | null;
    onClose: () => void;
}

export const ListGroupsDrawer = ({ list, onClose }: Props) => {
    const { t } = useTranslation();
    const { data: assigned = [] } = useListGroups(list?.id ?? null);
    const { data: allGroups = [] } = useAllGroupsForSelector();
    const toggleMut = useToggleListGroup();
    const { pendingIds, trigger } = useTrackedToggle(toggleMut.mutateAsync);
    const selectedIds = assigned.map((g) => g.id);

    return (
        <Drawer
            open={!!list}
            onClose={onClose}
            title={
                list
                    ? `${t('lists.groupsDrawer.titlePrefix')} ${list.name}`
                    : ''
            }
            subtitle={t('lists.groupsDrawer.subtitle')}
            footer={
                <Button variant="primary" onClick={onClose}>
                    {t('common.done')}
                </Button>
            }
        >
            {list && (
                <RelationPicker
                    items={allGroups}
                    selectedIds={selectedIds}
                    pendingIds={pendingIds}
                    onToggle={(groupId) =>
                        void trigger(groupId, {
                            listId: list.id,
                            groupId,
                            attach: !selectedIds.includes(groupId),
                        })
                    }
                    getLabel={(g) => g.name}
                    getDescription={(g) => g.to}
                    emptyText={t('lists.groupsDrawer.empty')}
                />
            )}
        </Drawer>
    );
};
