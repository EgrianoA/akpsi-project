import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Card, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ContainerOutlined, PlusCircleOutlined, FileExcelOutlined, BookOutlined } from '@ant-design/icons'
import useTaskModal from '../components/modals/TaskModal/useTaskModal'
import useUploadExcelModal from '../components/modals/TaskModal/useUploadExcelModal'
import dayjs from 'dayjs'


interface DataType {
    key: string;
    taskTitle: string;
    taskCategory: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Nama Tugas',
        dataIndex: 'taskTitle',
        key: 'taskTitle',
    },
    {
        title: 'Kategori Tugas',
        dataIndex: 'taskCategory',
        key: 'taskCategory',
    },
];

const dataSource = [
    {
        key: '1',
        taskTitle: 'Tugas A',
        taskCategory: 'Category A',
    },
    {
        key: '2',
        taskTitle: 'Tugas B',
        taskCategory: 'Category B',
    },
];

const taskDescription = () => {
    return <Card title="Deskripsi Tugas">Task Description</Card>;
}

const Task = () => {
    const taskModal = useTaskModal();
    const uploadExcelModal = useUploadExcelModal();
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
                    <BookOutlined />
                    <CrumbLink>Tugas</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Daftar Tugas Pemeriksaan</CrumbLink>
                </Crumb>
            </Breadcrumbs>
            <Space direction="vertical" style={{ display: 'flex' }} size="middle">
                <Text h3>Daftar Tugas Pemeriksaan</Text>
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
                        <Button type="primary" icon={<FileExcelOutlined />} onClick={() => uploadExcelModal.open()}>
                            Import dengan excel
                        </Button>
                        <Button type="primary" icon={<PlusCircleOutlined />}>
                            Tambah Tugas
                        </Button>
                    </Flex>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    expandable={{ expandedRowRender: taskDescription, defaultExpandedRowKeys: ['0'] }}
                    style={{ marginTop: '20px' }}
                    onRow={(row: any) => ({
                        onClick: () => {
                            console.log(row)
                            taskModal.open();
                        },
                        style: { cursor: 'pointer' },
                    })} />
            </Space>
            {taskModal.render()}
            {uploadExcelModal.render()}
        </Flex>
    );
};

export default Task;
