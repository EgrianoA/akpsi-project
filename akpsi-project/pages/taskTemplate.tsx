import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, FolderOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTaskTemplateModal from '../components/modals/TaskTemplateModal/useTaskTemplateModal'
import allTaskTemplate from '../public/dummyData/taskTemplate.json'
import allTaskList from '../public/dummyData/taskList.json'


interface DataType {
    key: string;
    taskTemplateName: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Nama Template Tugas',
        dataIndex: 'taskTemplateName',
        key: 'taskTemplateName',
    },
];

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

const taskListTable = (taskList) => {
    return <Table columns={taskColumn} dataSource={taskList} pagination={false} />;
}

const TaskTemplate = () => {
    const taskTemplateModal = useTaskTemplateModal();
    const taskTemplateData = useMemo(() => allTaskTemplate.map(template => ({
        key: template.templateId,
        taskTemplateName: template.templateName,
        taskList: template.taskList.map(taskInTemplate => {
            const taskDetail = allTaskList.find(task => task.taskId === taskInTemplate)
            return {
                key: taskDetail.taskId,
                taskName: taskDetail.taskName,
                taskDescription: taskDetail.taskDescription
            }
        })
    })), [allTaskTemplate, allTaskList])
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
                        placeholder="Cari Template"
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
                dataSource={taskTemplateData}
                expandable={{ expandedRowRender: (record) => taskListTable(record.taskList), defaultExpandedRowKeys: ['0'] }}
                style={{ marginTop: '20px' }}
                onRow={(row: any) => ({
                    onClick: () => {
                        taskTemplateModal.open(row.key);
                    },
                    style: { cursor: 'pointer' },
                })} />
            {taskTemplateModal.render()}
        </Flex>
    );
};

export default TaskTemplate;
