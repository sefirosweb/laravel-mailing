import React, { useEffect, useRef, useState } from 'react'
import { APP_URL } from '@/types/configurationType';
import { ColumnDefinition, Crud, CrudPropsRef, FieldTypes, MultiSelectOptionsColumns } from '@sefirosweb/react-crud'
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'react-bootstrap';

export default () => {
    const crudRef = useRef<CrudPropsRef>(null);
    const { t } = useTranslation()
    const [filters, setFilters] = useState("active");

    useEffect(() => {
        crudRef.current.setLazyilters({ status: filters });
    }, [filters])

    const customFilters = (
        <Row>
            <Col sm={12} md={'auto'} className='mt-3'>
                <Form.Select
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                >
                    <option value="active">{t('Active')}</option>
                    <option value="all">{t('All')}</option>
                    <option value="deleted">{t('Deleted')}</option>
                </Form.Select>
            </Col>
        </Row>
    )

    const multiSelectUser: MultiSelectOptionsColumns<User> = {
        primaryKey: 'id',
        sentKeyAs: 'user_id',
        url: `${APP_URL}/mailing_list/users`,
        getDataUrl: `${APP_URL}/mailing_list/users/get_array`,
        title: t('button.add_user_to_list'),
        columns: [
            {
                header: '#',
                accessorKey: 'id'
            },
            {
                accessorKey: 'name',
                header: t('Name'),
            },
            {
                accessorKey: 'email',
                header: t('Email'),
            },
        ],
    }

    const multiSelectGroup: MultiSelectOptionsColumns<MailingGroup> = {
        primaryKey: 'id',
        sentKeyAs: 'mailing_groups_id',
        url: `${APP_URL}/mailing_list/groups`,
        getDataUrl: `${APP_URL}/mailing_list/groups/get_array`,
        title: t('button.add_grouo_to_list'),
        columns: [
            {
                header: '#',
                accessorKey: 'id'
            },
            {
                accessorKey: 'name',
                header: t('Group'),
            },
            {
                accessorKey: 'to',
                header: t('To'),
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
            id: 'disabled',
            header: t('Disabled'),
            cell: (props) => props.row.original.deleted_at === null ? t('No') : t('Yes')
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
        },
    ]

    return (
        <>
            <h1>{t('List')}</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                customButtons={customFilters}
                createButtonTitle={t('button.create_new_list')}
                crudUrl={`${APP_URL}/mailing_list`}
                primaryKey="id"
                sentKeyAs='mailing_lists_id'
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
            />
        </>
    );
}