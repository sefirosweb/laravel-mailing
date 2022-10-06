import React, { useRef } from 'react'
import { APP_URL } from '@/types/configurationType';
import { ColumnDefinition, Crud, FieldTypes, MultiSelectOptionsColumns } from '@sefirosweb/react-crud'

export default () => {
    const crudRef = useRef();

    const multiSelectUser: MultiSelectOptionsColumns<User> = {
        primaryKey: 'id',
        url: `${APP_URL}/mailing_list/users`,
        getDataUrl: `${APP_URL}/mailing_list/users/get_array`,
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
            header: 'Name',
            accessorKey: 'name',
            titleOnCRUD: 'Name',
            editable: true,
            enableSorting: true,
        },
        {
            header: 'Code',
            accessorKey: 'code',
            titleOnCRUD: 'Code',
            editable: true,
            enableSorting: true,
        },
        {
            header: 'Description',
            accessorKey: 'description',
            titleOnCRUD: 'Description',
            editable: true,
            enableSorting: true,
            fieldType: FieldTypes.TEXTAREA
        },
        {
            header: 'Users',
            accessorKey: 'users',
            titleOnCRUD: 'Users',
            editable: true,
            fieldType: FieldTypes.MULTISELECT,
            multiSelectOptions: multiSelectUser

        },
        {
            header: 'Groups',
            id: 'groups', // TODO
            titleOnCRUD: 'Groups',
            editable: true,
            fieldType: FieldTypes.MULTISELECT,
            multiSelectOptions: multiSelectGroup
        }
    ]

    return (
        <>
            <h1>Mailing List</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                createButtonTitle="Create New Mailing List"
                crudUrl={`${APP_URL}/mailing_list`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
            />
        </>
    );
}