import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { ConfirmModal } from '@/ui/ConfirmModal';
import { Empty } from '@/ui/Empty';
import { TableFooter } from '@/ui/TableFooter';
import { TextInput } from '@/ui/TextInput';
import { useToast } from '@/ui/Toast';
import { IconMail, IconPlus, IconSearch, IconX } from '@/ui/icons';
import {
    useCreateList,
    useDeleteList,
    useLists,
    useUpdateList,
} from '@/hooks/useLists';
import { extractError } from '@/lib/extractError';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import { List, ListStatus } from '@/types/store';
import { ListEditDrawer, ListEditState } from './ListEditDrawer';
import { ListGroupsDrawer } from './ListGroupsDrawer';
import { ListRow } from './ListRow';
import { ListUsersDrawer } from './ListUsersDrawer';

export const Lists = () => {
    const { t } = useTranslation();
    const toast = useToast();

    const [status, setStatus] = useState<ListStatus>('active');
    const listsQ = useLists(status);
    const createMut = useCreateList();
    const updateMut = useUpdateList();
    const deleteMut = useDeleteList();

    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [editing, setEditing] = useState<ListEditState>(null);
    const [managingUsers, setManagingUsers] = useState<List | null>(null);
    const [managingGroups, setManagingGroups] = useState<List | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<List | null>(null);
    const [confirmRestore, setConfirmRestore] = useState<List | null>(null);

    const lists = listsQ.data ?? [];

    const debouncedQ = useDebouncedValue(q, 200);
    const filtered = useMemo(() => {
        if (!debouncedQ) return lists;
        const lq = debouncedQ.toLowerCase();
        return lists.filter(
            (l) =>
                l.name.toLowerCase().includes(lq) ||
                l.code.toLowerCase().includes(lq) ||
                (l.description ?? '').toLowerCase().includes(lq),
        );
    }, [lists, debouncedQ]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [totalPages, page]);

    return (
        <div>
            <div className="page-header">
                <div className="page-title-wrap">
                    <h1>{t('lists.title')}</h1>
                    <p>{t('lists.subtitle')}</p>
                </div>
                <Button
                    variant="primary"
                    icon={<IconPlus size={16} stroke={2.4} />}
                    onClick={() => setEditing({ mode: 'create' })}
                >
                    {t('lists.new')}
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
                    placeholder={t('lists.searchPlaceholder')}
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
                        icon={<IconMail size={20} />}
                        title={
                            q
                                ? t('lists.emptyFiltered.title')
                                : t('lists.empty.title')
                        }
                        description={
                            q
                                ? t('lists.emptyFiltered.description')
                                : t('lists.empty.description')
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
                                    {t('lists.new')}
                                </Button>
                            )
                        }
                    />
                ) : (
                    <table className="t">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>#</th>
                                <th>{t('lists.col.name')}</th>
                                <th>{t('lists.col.code')}</th>
                                <th>{t('lists.col.description')}</th>
                                <th>{t('lists.col.users')}</th>
                                <th>{t('lists.col.groups')}</th>
                                <th
                                    style={{ width: 100, textAlign: 'right' }}
                                >
                                    {t('lists.col.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageRows.map((l) => (
                                <ListRow
                                    key={l.id}
                                    list={l}
                                    onManageUsers={() => setManagingUsers(l)}
                                    onManageGroups={() => setManagingGroups(l)}
                                    onEdit={() =>
                                        setEditing({ mode: 'edit', list: l })
                                    }
                                    onDelete={() => setConfirmDelete(l)}
                                    onRestore={() => setConfirmRestore(l)}
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

            <ListEditDrawer
                editing={editing}
                onClose={() => setEditing(null)}
                busy={createMut.isPending || updateMut.isPending}
                onSave={(data) => {
                    if (!editing) return;
                    if (editing.mode === 'create') {
                        createMut.mutate(data, {
                            onSuccess: () => {
                                toast.success(
                                    t('lists.toast.created', {
                                        name: data.name,
                                    }),
                                );
                                setEditing(null);
                            },
                            onError: (err) => toast.error(extractError(err)),
                        });
                    } else {
                        updateMut.mutate(
                            { id: editing.list.id, payload: data },
                            {
                                onSuccess: () => {
                                    toast.success(t('lists.toast.updated'));
                                    setEditing(null);
                                },
                                onError: (err) =>
                                    toast.error(extractError(err)),
                            },
                        );
                    }
                }}
            />

            <ListUsersDrawer
                list={managingUsers}
                onClose={() => setManagingUsers(null)}
            />

            <ListGroupsDrawer
                list={managingGroups}
                onClose={() => setManagingGroups(null)}
            />

            <ConfirmModal
                open={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={() => {
                    if (!confirmDelete) return;
                    deleteMut.mutate(confirmDelete.id, {
                        onSuccess: () => {
                            toast.success(
                                t('lists.toast.deleted', {
                                    name: confirmDelete.name,
                                }),
                            );
                            setConfirmDelete(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('lists.deleteConfirm.title')}
                description={
                    confirmDelete &&
                    t('lists.deleteConfirm.description', {
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
                                t('lists.toast.restored', {
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
