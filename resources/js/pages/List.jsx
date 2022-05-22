import { Crud } from '@sefirosweb/react-crud'
import React, { useRef } from 'react'

const List = () => {
    const crudRef = useRef();

    return (
        <>
            <h1>Mailing List</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                canSearch
                createButtonTitle="Create New Mailing List"
                crudUrl={`${APP_URL}/mailing_list`}
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
                        accessor: 'code',
                        titleOnCRUD: 'Code',
                        Header: 'Code',
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
                    {
                        accessor: 'users',
                        titleOnCRUD: 'Users',
                        Header: 'Users',
                        editable: true,
                        type: 'multiselect',
                        multiSelectOptionsPrimaryKey: 'id',
                        multiSelectOptionsUrl: `${APP_URL}/mailing_list/users`,
                        multiSelectOptionsColumns: [
                            {
                                Header: '#',
                                accessor: 'id'
                            },
                            {
                                Header: 'Name',
                                accessor: 'name'
                            },
                            {
                                Header: 'Email',
                                accessor: 'email'
                            },
                        ],
                    },
                    {
                        accessor: 'groups',
                        titleOnCRUD: 'Groups',
                        Header: 'Groups',
                        editable: true,
                        type: 'multiselect',
                        multiSelectOptionsPrimaryKey: 'id',
                        multiSelectOptionsUrl: `${APP_URL}/mailing_list/groups`,
                        multiSelectOptionsColumns: [
                            {
                                Header: '#',
                                accessor: 'id'
                            },
                            {
                                Header: 'Group',
                                accessor: 'name'
                            },
                            {
                                Header: 'To',
                                accessor: 'to'
                            }
                        ],
                    }
                ]}
            />
        </>
    );
}

export default List;