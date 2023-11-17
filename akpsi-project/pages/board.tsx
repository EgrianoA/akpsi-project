import { Button, Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { UsersIcon } from '../components/icons/breadcrumb/users-icon';
import { Flex } from '../components/styles/flex';
import { Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons'


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
        title: 'No. Tugas',
        dataIndex: 'taskNo',
        key: 'taskNo',
    },
    {
        title: 'Nama Tugas',
        dataIndex: 'taskTitle',
        key: 'taskTitle',
    },
    {
        title: 'Investigator',
        dataIndex: 'assignedTo',
        key: 'assignedTo',
    },
    {
        title: 'Ditugaskan Oleh',
        dataIndex: 'supervisedBy',
        key: 'supervisedBy',
    },
    {
        title: 'Kompleksitas',
        key: 'complexity',
        dataIndex: 'complexity',
        render: (_, { complexity }) => (
            <>
                <Tag color="lime" key={complexity}>
                    {complexity.toUpperCase()}
                </Tag>
            </>
        ),
    },
    {
        title: 'Durasi Pengerjaan',
        dataIndex: 'estimationWorkingTime',
        key: 'estimationWorkingTime',
        render: (_, { estimationWorkingTime }) => (
            `${estimationWorkingTime} hari`
        ),
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                <Tag color="cyan" key={status}>
                    {status.toUpperCase()}
                </Tag>
            </>
        ),
    },
];

const dataSource = [
    {
        key: '1',
        taskNo: 'TASK-01',
        taskTitle: 'Tugas A',
        assignedTo: 'Investigator 1',
        supervisedBy: 'Team Lead 1',
        complexity: 'Low',
        estimationWorkingTime: 1,
        status: 'On-Progress',
    },
    {
        key: '2',
        taskNo: 'TASK-02',
        taskTitle: 'Tugas B',
        assignedTo: 'Investigator 3',
        supervisedBy: 'Sub Team Lead 1',
        complexity: 'High',
        estimationWorkingTime: 2,
        status: 'On-Progress',
    },
];

const board = () => {
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
                    <UsersIcon />
                    <CrumbLink>Tugas</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Daftar Tugas</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>Daftar Tugas</Text>
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
            </Flex>

            <Table columns={columns} dataSource={dataSource} style={{ marginTop: '20px' }} />
        </Flex>
    );
};

export default board;
