import { useTranslation } from 'react-i18next';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
    IconLink,
    IconMail,
    IconPencil,
    IconRefresh,
    IconTrash,
    IconUsers,
} from '@/ui/icons';
import { List } from '@/types/store';

interface Props {
    list: List;
    onManageUsers: () => void;
    onManageGroups: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onRestore?: () => void;
}

export const ListRow = ({
    list,
    onManageUsers,
    onManageGroups,
    onEdit,
    onDelete,
    onRestore,
}: Props) => {
    const { t } = useTranslation();
    const usersCount = list.users_count ?? 0;
    const groupsCount = list.groups_count ?? 0;
    const isDeleted = !!list.deleted_at;

    return (
        <tr className={isDeleted ? 'is-trashed' : undefined}>
            <td className="t-id">{list.id}</td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="t-name-icon is-group">
                        <IconMail size={12} />
                    </span>
                    <span style={{ fontWeight: 500 }}>{list.name}</span>
                    {isDeleted && (
                        <Badge variant="danger">{t('deletedBadge')}</Badge>
                    )}
                </div>
            </td>
            <td className="mono" style={{ fontSize: 12.5 }}>
                {list.code}
            </td>
            <td style={{ color: 'var(--fg-muted)', maxWidth: 320 }}>
                {list.description}
            </td>
            <td>
                <button
                    onClick={onManageUsers}
                    className="t-rel-count"
                    disabled={isDeleted}
                >
                    <IconUsers size={12} />
                    {usersCount}
                </button>
            </td>
            <td>
                <button
                    onClick={onManageGroups}
                    className="t-rel-count"
                    disabled={isDeleted}
                >
                    <IconLink size={12} />
                    {groupsCount}
                </button>
            </td>
            <td>
                <div className="t-actions">
                    {!isDeleted && (
                        <Button
                            variant="ghost"
                            onClick={onEdit}
                            title={t('lists.actions.edit')}
                        >
                            <IconPencil size={14} />
                        </Button>
                    )}
                    {isDeleted && onRestore ? (
                        <Button
                            variant="ghost"
                            onClick={onRestore}
                            title={t('restoreAction')}
                        >
                            <IconRefresh size={14} />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            onClick={onDelete}
                            title={t('lists.actions.delete')}
                        >
                            <IconTrash size={14} />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};
