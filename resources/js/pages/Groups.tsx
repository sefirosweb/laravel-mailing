import React, { useEffect, useRef, useState } from 'react'
import { APP_URL } from '@/types/configurationType';
import { ColumnDefinition, Crud, CrudPropsRef, FieldTypes } from '@sefirosweb/react-crud'
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

    const columns: Array<ColumnDefinition<MailingGroup>> = [
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
            id: 'disabled',
            header: t('Disabled'),
            cell: (props) => props.row.original.deleted_at === null ? t('No') : t('Yes')
        },
        {
            accessorKey: 'description',
            titleOnCRUD: t('Description'),
            header: t('Description'),
            editable: true,
            enableSorting: true,
            fieldType: FieldTypes.TEXTAREA
        },
    ]

    return (
        <>
            <h1>{t('Groups')}</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                enableGlobalFilter
                customButtons={customFilters}
                ref={crudRef}
                createButtonTitle={t('button.create_new_group')}
                crudUrl={`${APP_URL}/mailing_group`}
                primaryKey="id"
                sentKeyAs='mailing_groups_id'
                titleOnDelete="name"
                columns={columns}
            />

        </>
    );
}