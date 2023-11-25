import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ContainerOutlined, PlusCircleOutlined, ReadOutlined } from '@ant-design/icons'
import useTaskCategoryModal from '../components/modals/TaskCategoryModal/useTaskCategoryModal'
import taskCategory from '../public/dummyData/taskCategory.json'


interface DataType {
    key: string;
    taskCategory: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Kategori Tugas',
        dataIndex: 'taskCategory',
        key: 'taskCategory',
    },
];


const Task = () => {
    const taskCategoryModal = useTaskCategoryModal();
    const taskCategoryList = useMemo(() => taskCategory.map(category => ({ key: category.taskCategoryId, taskCategory: category.categoryName })), [taskCategory])
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
                    <ReadOutlined />
                    <CrumbLink>Kategori</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Daftar Kategori</CrumbLink>
                </Crumb>
            </Breadcrumbs>
            <Space direction="vertical" style={{ display: 'flex' }} size="middle">
                <Text h3>Daftar Kategori</Text>
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
                            placeholder="Cari Kategori"
                            suffix={
                                <SearchOutlined />
                            }
                        />
                    </Flex>
                    <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'}>
                        <Button type="primary" icon={<PlusCircleOutlined />}>
                            Tambah Kategori
                        </Button>
                    </Flex>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={taskCategoryList}
                    style={{ marginTop: '20px' }}
                    onRow={(row: any) => ({
                        onClick: () => {
                            taskCategoryModal.open(row.key);
                        },
                        style: { cursor: 'pointer' },
                    })} />
            </Space>
            {taskCategoryModal.render()}
        </Flex>
    );
};

export default Task;
