import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Button, Tag, Row, Col, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, FolderOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTaskTemplateModal from '../components/modals/TaskTemplateModal/useTaskTemplateModal'
import dayjs from 'dayjs'


interface DataType {
    key: string;
    taskNo: string;
    taskTitle: string;
    assignedTo: string;
    supervisedBy: string;
    complexity: string,
    estimationWorkingTime: number;
    status: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Nama Template Tugas',
        dataIndex: 'taskTemplateName',
        key: 'taskTemplateName',
    },
];

const dataSource = [
    {
        key: '1',
        taskTemplateName: 'Template Tugas-01',
    },
    {
        key: '2',
        taskTemplateName: 'Template Tugas-02',
    },
];

const taskDataSource = [
    {
        key: 'A1',
        taskName: 'Task A',
        taskDescription: 'Task A Description',
        parentTask: '1'
    },
    {
        key: 'B2',
        taskName: 'Task B',
        taskDescription: 'Task B Description',
        parentTask: '1'
    },
    {
        key: 'C3',
        taskName: 'Task C',
        taskDescription: 'Task C Description',
        parentTask: '1'
    },
    {
        key: 'D4',
        taskName: 'Task D',
        taskDescription: 'Task D Description',
        parentTask: '1'
    },
    {
        key: 'G7',
        taskName: 'Task G',
        taskDescription: 'Task G Description',
        parentTask: '2'
    },
    {
        key: 'H8',
        taskName: 'Task H',
        taskDescription: 'Task H Description',
        parentTask: '2'
    },
]

const taskColumn = [
    {
        title: 'Nama Tugas',
        dataIndex: 'taskName',
        key: 'taskName',
    },
    {
        title: 'Deskripsi Tugas',
        dataIndex: 'taskDescription',
        key: 'taskDescription',
    },
]

const taskListTable = (parentRecord) => {
    return <Table columns={taskColumn} dataSource={taskDataSource.filter(task => task.parentTask === parentRecord.key)} pagination={false} />;
}

const TaskTemplate = () => {
    const taskTemplateModal = useTaskTemplateModal();
    return (
        <Flex
            css={{
                'mt': '$5',
                'px': '$6',
                '@sm': {
                    mt: '$10',
                    px: '$16',
                },
            }}
            justify={'center'}
            direction={'column'}
        >
            <Breadcrumbs>
                <Crumb>
                    <FolderOutlined />
                    <CrumbLink>Template Tugas</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Daftar Template Tugas</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>Daftar Template Tugas</Text>
            <Flex
                css={{ gap: '$8' }}
                align={'center'}
                justify={'between'}
                wrap={'wrap'}
            >
                <Flex
                    css={{
                        'gap': '$6',
                        'flexWrap': 'wrap',
                        '@sm': { flexWrap: 'nowrap' },
                    }}
                    align={'center'}
                >
                    <Input
                        placeholder="Cari Tugas"
                        suffix={
                            <SearchOutlined />
                        }
                    />
                </Flex>
                <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'}>
                    <Button type="primary" icon={<PlusCircleOutlined />}>
                        Tambah Template Tugas
                    </Button>
                </Flex>
            </Flex>
            <br />
            <Table
                columns={columns}
                dataSource={dataSource}
                expandable={{ expandedRowRender: taskListTable, defaultExpandedRowKeys: ['0'] }}
                style={{ marginTop: '20px' }}
                onRow={(row: any) => ({
                    onClick: () => {
                        console.log(row)
                        taskTemplateModal.open();
                    },
                    style: { cursor: 'pointer' },
                })} />
            {taskTemplateModal.render()}
        </Flex>
    );
};

export default TaskTemplate;
