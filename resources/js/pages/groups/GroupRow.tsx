import { useTranslation } from 'react-i18next';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { IconPencil, IconRefresh, IconTrash, IconUsers } from '@/ui/icons';
import { Group } from '@/types/store';

interface Props {
    group: Group;
    onEdit: () => void;
    onDelete: () => void;
    onRestore?: () => void;
}

export const GroupRow = ({ group, onEdit, onDelete, onRestore }: Props) => {
    const { t } = useTranslation();
    const isDeleted = !!group.deleted_at;

    return (
        <tr className={isDeleted ? 'is-trashed' : undefined}>
            <td className="t-id">{group.id}</td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="t-name-icon is-group">
                        <IconUsers size={12} />
                    </span>
                    <span style={{ fontWeight: 500 }}>{group.name}</span>
                    {isDeleted && (
                        <Badge variant="danger">{t('deletedBadge')}</Badge>
                    )}
                </div>
            </td>
            <td className="mono" style={{ fontSize: 12.5 }}>
                {group.to}
            </td>
            <td style={{ color: 'var(--fg-muted)', maxWidth: 360 }}>
                {group.description}
            </td>
            <td>
                <div className="t-actions">
                    {!isDeleted && (
                        <Button
                            variant="ghost"
                            onClick={onEdit}
                            title={t('groups.actions.edit')}
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
                            title={t('groups.actions.delete')}
                        >
                            <IconTrash size={14} />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};
