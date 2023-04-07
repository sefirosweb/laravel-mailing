import React from 'react'
import { APP_URL } from '@/types/configurationType';
import { Crud, FieldTypes } from '@sefirosweb/react-crud'
import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation()

    return (
        <>
            <h1>{t('Groups')}</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                createButtonTitle={t('button.create_new_group')}
                crudUrl={`${APP_URL}/mailing_group`}
                primaryKey="id"
                titleOnDelete="name"
                columns={[
                    {
                        header: '#',
                        accessorKey: 'id',
                        enableSorting: true,
                        visible: true
                    },
                    {
                        accessorKey: 'name',
                        header: t('Name'),
                        titleOnCRUD: t('Name'),
                        editable: true,
                        enableSorting: true,
                    },
                    {
                        accessorKey: 'to',
                        titleOnCRUD: t('To'),
                        header: t('To'),
                        editable: true,
                        enableSorting: true,
                    },
                    {
                        accessorKey: 'description',
                        titleOnCRUD: t('Description'),
                        header: t('Description'),
                        editable: true,
                        enableSorting: true,
                        fieldType: FieldTypes.TEXTAREA
                    },
                ]}
            />

        </>
    );
}