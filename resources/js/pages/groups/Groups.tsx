import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { ConfirmModal } from '@/ui/ConfirmModal';
import { Empty } from '@/ui/Empty';
import { TableFooter } from '@/ui/TableFooter';
import { TextInput } from '@/ui/TextInput';
import { useToast } from '@/ui/Toast';
import { IconPlus, IconSearch, IconUsers, IconX } from '@/ui/icons';
import {
    useCreateGroup,
    useDeleteGroup,
    useGroups,
    useUpdateGroup,
} from '@/hooks/useGroups';
import { extractError } from '@/lib/extractError';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import { Group, ListStatus } from '@/types/store';
import { GroupEditDrawer, GroupEditState } from './GroupEditDrawer';
import { GroupRow } from './GroupRow';

export const Groups = () => {
    const { t } = useTranslation();
    const toast = useToast();

    const [status, setStatus] = useState<ListStatus>('active');
    const groupsQ = useGroups(status);
    const createMut = useCreateGroup();
    const updateMut = useUpdateGroup();
    const deleteMut = useDeleteGroup();

    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [editing, setEditing] = useState<GroupEditState>(null);
    const [confirmDelete, setConfirmDelete] = useState<Group | null>(null);
    const [confirmRestore, setConfirmRestore] = useState<Group | null>(null);

    const groups = groupsQ.data ?? [];

    const debouncedQ = useDebouncedValue(q, 200);
    const filtered = useMemo(() => {
        if (!debouncedQ) return groups;
        const lq = debouncedQ.toLowerCase();
        return groups.filter(
            (g) =>
                g.name.toLowerCase().includes(lq) ||
                g.to.toLowerCase().includes(lq) ||
                (g.description ?? '').toLowerCase().includes(lq),
        );
    }, [groups, debouncedQ]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [totalPages, page]);

    return (
        <div>
            <div className="page-header">
                <div className="page-title-wrap">
                    <h1>{t('groups.title')}</h1>
                    <p>{t('groups.subtitle')}</p>
                </div>
                <Button
                    variant="primary"
                    icon={<IconPlus size={16} stroke={2.4} />}
                    onClick={() => setEditing({ mode: 'create' })}
                >
                    {t('groups.new')}
                </Button>
            </div>

            <div className="page-toolbar">
                <div
                    className="sort-toggle"
                    role="tablist"
                    style={{ marginTop: 0, marginRight: 12 }}
                >
                    {(['active', 'all', 'deleted'] as ListStatus[]).map(
                        (s) => (
                            <button
                                key={s}
                                type="button"
                                role="tab"
                                className={
                                    'sort-toggle-btn' +
                                    (status === s ? ' is-active' : '')
                                }
                                onClick={() => setStatus(s)}
                            >
                                {t('status.' + s)}
                            </button>
                        ),
                    )}
                </div>
                <TextInput
                    icon={<IconSearch size={14} />}
                    placeholder={t('groups.searchPlaceholder')}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    suffix={
                        q && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setQ('')}
                            >
                                <IconX size={12} />
                            </Button>
                        )
                    }
                />
            </div>

            <div className="card">
                {filtered.length === 0 ? (
                    <Empty
                        icon={<IconUsers size={20} />}
                        title={
                            q
                                ? t('groups.emptyFiltered.title')
                                : t('groups.empty.title')
                        }
                        description={
                            q
                                ? t('groups.emptyFiltered.description')
                                : t('groups.empty.description')
                        }
                        action={
                            !q && (
                                <Button
                                    variant="primary"
                                    icon={<IconPlus size={14} />}
                                    onClick={() =>
                                        setEditing({ mode: 'create' })
                                    }
                                >
                                    {t('groups.new')}
                                </Button>
                            )
                        }
                    />
                ) : (
                    <table className="t">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>#</th>
                                <th>{t('groups.col.name')}</th>
                                <th>{t('groups.col.to')}</th>
                                <th>{t('groups.col.description')}</th>
                                <th
                                    style={{ width: 100, textAlign: 'right' }}
                                >
                                    {t('groups.col.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageRows.map((g) => (
                                <GroupRow
                                    key={g.id}
                                    group={g}
                                    onEdit={() =>
                                        setEditing({ mode: 'edit', group: g })
                                    }
                                    onDelete={() => setConfirmDelete(g)}
                                    onRestore={() => setConfirmRestore(g)}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                {filtered.length > 0 && (
                    <TableFooter
                        page={page}
                        totalPages={totalPages}
                        onPage={setPage}
                        perPage={perPage}
                        onPerPage={setPerPage}
                        total={filtered.length}
                    />
                )}
            </div>

            <GroupEditDrawer
                editing={editing}
                onClose={() => setEditing(null)}
                busy={createMut.isPending || updateMut.isPending}
                onSave={(data) => {
                    if (!editing) return;
                    if (editing.mode === 'create') {
                        createMut.mutate(data, {
                            onSuccess: () => {
                                toast.success(
                                    t('groups.toast.created', {
                                        name: data.name,
                                    }),
                                );
                                setEditing(null);
                            },
                            onError: (err) => toast.error(extractError(err)),
                        });
                    } else {
                        updateMut.mutate(
                            { id: editing.group.id, payload: data },
                            {
                                onSuccess: () => {
                                    toast.success(t('groups.toast.updated'));
                                    setEditing(null);
                                },
                                onError: (err) =>
                                    toast.error(extractError(err)),
                            },
                        );
                    }
                }}
            />

            <ConfirmModal
                open={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={() => {
                    if (!confirmDelete) return;
                    deleteMut.mutate(confirmDelete.id, {
                        onSuccess: () => {
                            toast.success(
                                t('groups.toast.deleted', {
                                    name: confirmDelete.name,
                                }),
                            );
                            setConfirmDelete(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('groups.deleteConfirm.title')}
                description={
                    confirmDelete &&
                    t('groups.deleteConfirm.description', {
                        name: confirmDelete.name,
                    })
                }
                confirmText={t('common.delete')}
                busy={deleteMut.isPending}
            />

            <ConfirmModal
                open={!!confirmRestore}
                onClose={() => setConfirmRestore(null)}
                onConfirm={() => {
                    if (!confirmRestore) return;
                    deleteMut.mutate(confirmRestore.id, {
                        onSuccess: () => {
                            toast.success(
                                t('groups.toast.restored', {
                                    name: confirmRestore.name,
                                }),
                            );
                            setConfirmRestore(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('restoreConfirm.title')}
                description={
                    confirmRestore &&
                    t('restoreConfirm.description', {
                        name: confirmRestore.name,
                    })
                }
                confirmText={t('restoreAction')}
                tone="warning"
                busy={deleteMut.isPending}
            />
        </div>
    );
};
