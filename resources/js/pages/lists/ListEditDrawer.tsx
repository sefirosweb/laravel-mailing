import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { Drawer } from '@/ui/Drawer';
import { Field } from '@/ui/Field';
import { TextInput } from '@/ui/TextInput';
import { List, ListPayload } from '@/types/store';

export type ListEditState =
    | null
    | { mode: 'create' }
    | { mode: 'edit'; list: List };

interface Props {
    editing: ListEditState;
    onClose: () => void;
    onSave: (data: ListPayload) => void;
    busy?: boolean;
}

export const ListEditDrawer = ({ editing, onClose, onSave, busy }: Props) => {
    const { t } = useTranslation();
    const [form, setForm] = useState<ListPayload>({
        name: '',
        code: '',
        description: '',
    });

    useEffect(() => {
        if (!editing) return;
        if (editing.mode === 'edit') {
            setForm({
                name: editing.list.name,
                code: editing.list.code,
                description: editing.list.description ?? '',
            });
        } else {
            setForm({ name: '', code: '', description: '' });
        }
    }, [editing]);

    if (!editing) return null;

    const isEdit = editing.mode === 'edit';
    const isValid = !!form.name.trim() && !!form.code.trim();

    return (
        <Drawer
            open
            onClose={onClose}
            title={
                isEdit
                    ? t('lists.form.editTitle')
                    : t('lists.form.createTitle')
            }
            subtitle={
                isEdit
                    ? `${t('lists.form.editSubtitlePrefix')} ${editing.list.name}`
                    : t('lists.form.createSubtitle')
            }
            footer={
                <>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={busy}
                    >
                        {t('common.cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!isValid || busy}
                        onClick={() => onSave(form)}
                    >
                        {isEdit
                            ? t('common.save')
                            : t('lists.form.createBtn')}
                    </Button>
                </>
            }
        >
            <Field label={t('lists.form.name')}>
                <TextInput
                    placeholder={t('lists.form.namePlaceholder')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoFocus
                />
            </Field>
            <Field label={t('lists.form.code')} help={t('lists.form.codeHelp')}>
                <TextInput
                    placeholder={t('lists.form.codePlaceholder')}
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
            </Field>
            <Field
                label={t('lists.form.description')}
                help={t('lists.form.descriptionHelp')}
            >
                <textarea
                    className="input"
                    placeholder={t('lists.form.descriptionPlaceholder')}
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </Field>
        </Drawer>
    );
};
