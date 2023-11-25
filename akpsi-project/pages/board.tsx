import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Tag, Row, Col, Card, Statistic, List, Button, Space, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ContainerOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTaskMonitorModal from '../components/modals/TaskMonitorModal/useTaskMonitorModal'
import dayjs from 'dayjs'
import allUserData from '../public/dummyData/userList.json'
import allMonitorTaskList from '../public/dummyData/allMonitorTaskList.json'
import taskList from '../public/dummyData/taskList.json'
import { generateComplexityTag, generateStatusTagColor } from '../utilities/generateTag'


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
        title: 'Ditugaskan Untuk',
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
                {complexity}
            </>
        ),
    },
    {
        title: 'Estimasi Pengerjaan',
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
                {status}
            </>
        ),
    },
];

const reportTimelineItems: { key: string; label: string; value: string }[] = [
    {
        key: '1',
        label: 'Target Penyelesaian Pemeriksaan',
        value: dayjs().add(7, 'days').format('DD-MM-YYYY'),
    },
    {
        key: '2',
        label: 'Estimasi Penyelesaian Pemeriksaan',
        value: dayjs().add(2, 'days').format('DD-MM-YYYY'),
    },
]

const statusReportItems = [
    {
        key: '1',
        label: 'Total Pemeriksaan',
        children: <Tag>2</Tag>,
        span: 3
    },
    {
        key: '2',
        label: 'Selesai',
        children: <Tag color="success">0</Tag>,
        span: 2
    },
    {
        key: '3',
        label: 'Dalam Pengerjaan',
        children: <Tag color="processing">2</Tag>,
        span: 2
    },
    {
        key: '4',
        label: 'Memerlukan Informasi Lebih Lanjut',
        children: <Tag color="gold">0</Tag>,
        span: 2
    },
    {
        key: '5',
        label: 'Akan Dikerjakan',
        children: <Tag>0</Tag>,
        span: 2
    },
]

const Board = () => {
    const taskModal = useTaskMonitorModal();
    const personalUserData = allUserData[0]
    const [taskTableData, taskStatusCount, taskChart] = useMemo(() => {
        const currentActiveTaskList = allMonitorTaskList.filter(task => task.assignedTo === personalUserData.employeeNumber)
        const taskTableData = []
        const taskStatusCount = [{
            key: 'Total Pemeriksaan',
            label: 'Total Pemeriksaan',
            children: <Tag>{currentActiveTaskList.length}</Tag>,
            span: 3
        }]
        const taskChart = []
        const statusCountMap = new Map()
        currentActiveTaskList.forEach((data, index) => {
            if (statusCountMap.get(data.status)) {
                statusCountMap.set(data.status, statusCountMap.get(data.status) + 1)
            } else {
                statusCountMap.set(data.status, 1)
            }

            taskTableData.push({
                key: index,
                taskNo: data.taskNumber,
                taskTitle: taskList.find(task => task.taskId === data.taskId).taskName,
                assignedTo: allUserData.find(user => user.employeeNumber === data.assignedTo).fullName,
                supervisedBy: allUserData.find(user => user.employeeNumber === data.assignedBy).fullName,
                complexity: generateComplexityTag(data.complexity),
                estimationWorkingTime: data.estimation,
                status: <Tag color={generateStatusTagColor(data.status)} style={{ whiteSpace: 'break-spaces' }}>{data.status}</Tag>
            });

        });

        statusCountMap.forEach((values, keys) => {
            taskStatusCount.push({
                key: keys,
                label: keys,
                children: <Tag color={generateStatusTagColor(keys)}>{values}</Tag>,
                span: 2
            })

            taskChart.push({
                "name": keys,
                "value": values,
                "color": generateStatusTagColor(keys)
            })
        })


        return [taskTableData, taskStatusCount, taskChart]
    }, [allMonitorTaskList, taskList, personalUserData])

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
                    <ContainerOutlined />
                    <CrumbLink>Monitor</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Monitor Tugas Pemeriksaan</CrumbLink>
                </Crumb>
            </Breadcrumbs>
            <Space direction="vertical" style={{ display: 'flex' }} size="middle">
                <Row>
                    <Text h3>Monitor Tugas Pemeriksaan</Text>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false} title='Status Pemeriksaan' >
                            <Descriptions title="" bordered items={taskStatusCount} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} title='Timeline Pemeriksaan' >
                            <List
                                grid={{ gutter: 16, column: 2 }}
                                dataSource={reportTimelineItems}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card style={{ width: '20vw' }}>
                                            <Statistic
                                                title={item.label}
                                                value={item.value}
                                            /></Card>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
                <br />
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
                            Tambah Tugas
                        </Button>
                    </Flex>
                </Flex>
                <Table columns={columns} dataSource={taskTableData} style={{ marginTop: '20px' }} onRow={(row: any) => ({
                    onClick: () => {
                        taskModal.open(row.taskNo);
                    },
                    style: { cursor: 'pointer' },
                })} />
            </Space>
            {taskModal.render()}
        </Flex>
    );
};

export default Board;
