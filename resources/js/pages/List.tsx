import React, { useRef } from 'react'
import { APP_URL } from '@/types/configurationType';
import { ColumnDefinition, Crud, FieldTypes, MultiSelectOptionsColumns } from '@sefirosweb/react-crud'
import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation()
    const crudRef = useRef();

    const multiSelectUser: MultiSelectOptionsColumns<User> = {
        primaryKey: 'id',
        url: `${APP_URL}/mailing_list/users`,
        getDataUrl: `${APP_URL}/mailing_list/users/get_array`,
        title: "Add user to mailing list",
        columns: [
            {
                header: '#',
                accessorKey: 'id'
            },
            {
                header: 'Name',
                accessorKey: 'name'
            },
            {
                header: 'Email',
                accessorKey: 'email'
            },
        ],
    }

    const multiSelectGroup: MultiSelectOptionsColumns<MailingGroup> = {
        primaryKey: 'id',
        url: `${APP_URL}/mailing_list/groups`,
        getDataUrl: `${APP_URL}/mailing_list/groups/get_array`,
        title: "Add group to mailing list",
        columns: [
            {
                header: '#',
                accessorKey: 'id'
            },
            {
                header: 'Group',
                accessorKey: 'name'
            },
            {
                header: 'To',
                accessorKey: 'to'
            },
        ],
    }

    const columns: Array<ColumnDefinition<MailingList>> = [
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
            accessorKey: 'code',
            header: t('Code'),
            titleOnCRUD: t('Code'),
            editable: true,
            enableSorting: true,
        },
        {
            accessorKey: 'description',
            header: t('Description'),
            titleOnCRUD: t('Description'),
            editable: true,
            enableSorting: true,
            fieldType: FieldTypes.TEXTAREA
        },
        {
            id: 'users',
            header: t('Users'),
            titleOnCRUD: t('Users'),
            editable: true,
            fieldType: FieldTypes.MULTISELECT,
            multiSelectOptions: multiSelectUser

        },
        {
            id: 'groups',
            header: t('Grupos'),
            titleOnCRUD: t('Grupos'),
            editable: true,
            fieldType: FieldTypes.MULTISELECT,
            multiSelectOptions: multiSelectGroup
        }
    ]

    return (
        <>
            <h1>{t('List')}</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                createButtonTitle={t('button.create_new_list')}
                crudUrl={`${APP_URL}/mailing_list`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
            />
        </>
    );
}