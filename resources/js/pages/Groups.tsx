import React from 'react'
import { APP_URL } from '@/types/configurationType';
import { Crud, FieldTypes } from '@sefirosweb/react-crud'

export default () => {
    return (
        <>
            <h1>Group List</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                createButtonTitle="Create New Group"
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
                        header: 'Name',
                        titleOnCRUD: 'Name',
                        editable: true,
                        enableSorting: true,
                    },
                    {
                        accessorKey: 'to',
                        titleOnCRUD: 'To',
                        header: 'To',
                        editable: true,
                        enableSorting: true,
                    },
                    {
                        accessorKey: 'description',
                        titleOnCRUD: 'Description',
                        header: 'Description',
                        editable: true,
                        enableSorting: true,
                        fieldType: FieldTypes.TEXTAREA
                    },
                ]}
            />

        </>
    );
}