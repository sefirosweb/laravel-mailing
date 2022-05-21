import { Crud } from '@sefirosweb/react-crud'
import React, { useRef } from 'react'

const Groups = () => {
    const crudRef = useRef();

    return (
        <>
            <h1>Group List</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                canSearch
                createButtonTitle="Create New Group"
                crudUrl={`${APP_URL}/mailing_group`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={[
                    {
                        Header: '#',
                        accessor: 'id',
                        sortable: true,
                        visible: true
                    },
                    {
                        accessor: 'name',
                        Header: 'Name',
                        titleOnCRUD: 'Name',
                        editable: true,
                        sortable: true,
                    },
                    {
                        accessor: 'to',
                        titleOnCRUD: 'To',
                        Header: 'To',
                        editable: true,
                        sortable: true,
                    },
                    {
                        accessor: 'description',
                        titleOnCRUD: 'Description',
                        Header: 'Description',
                        editable: true,
                        sortable: true,
                        type: 'textarea'
                    },
                ]}
            />

        </>
    );
}

export default Groups;