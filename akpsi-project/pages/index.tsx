import { useMemo } from 'react';
import { Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import type { ColumnsType } from 'antd/es/table';
import { Input, Table, Tag, Row, Col, Card, Statistic, List, Descriptions } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import {
   PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts'
import useTaskMonitorModal from '../components/modals/TaskMonitorModal/useTaskMonitorModal'
import allUserData from '../public/dummyData/userList.json'
import allMonitorTaskList from '../public/dummyData/allMonitorTaskList.json'
import taskList from '../public/dummyData/taskList.json'
import { generateComplexityTag, generateStatusTagColor } from '../utilities/generateTag'

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   );
}

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

const progressBarData = [
   {
      "name": "Target",
      "time": dayjs().add(7, 'days').unix(),
      "color": "#52c41a"
   },
   {
      "name": "Estimasi",
      "time": dayjs().add(2, 'days').unix(),
      "color": "#1677ff"
   },
   {
      "name": "Saat Ini",
      "time": dayjs().unix(),
      "color": "#bfbfbf"
   }
]

interface DataType {
   key: string;
   taskNo: string;
   taskTitle: string;
   assignedTo: string;
   supervisedBy: string;
   priority: string,
   estimationWorkingTime: number;
   status: string;
}

const columns: ColumnsType<DataType> = [
   {
      title: 'No. Tugas',
      dataIndex: 'taskNo',
      key: 'taskNo',
      width: 150,
   },
   {
      title: 'Nama Tugas',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
      width: 250,
   },
   {
      title: 'Ditugaskan Oleh',
      dataIndex: 'supervisedBy',
      key: 'supervisedBy',
      width: 200,
   },
   {
      title: 'Prioritas',
      key: 'priority',
      dataIndex: 'priority',
      render: (_, { priority }) => (
         <>
            {priority}
         </>
      ),
      width: 100,
   },
   {
      title: 'Estimasi Pengerjaan',
      dataIndex: 'estimationWorkingTime',
      key: 'estimationWorkingTime',
      render: (_, { estimationWorkingTime }) => (
         `${estimationWorkingTime} hari`
      ),
      width: 100,
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
      width: 100,
   },
];

const Home: NextPage = () => {
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

         if (data.status !== 'Selesai') {
            taskTableData.push({
               key: index,
               taskNo: data.taskNumber,
               taskTitle: taskList.find(task => task.taskId === data.taskId).taskName,
               supervisedBy: allUserData.find(user => user.employeeNumber === data.assignedBy).fullName,
               priority: generateComplexityTag(data.complexity),
               estimationWorkingTime: data.estimation,
               status: <Tag color={generateStatusTagColor(data.status)} style={{ whiteSpace: 'break-spaces' }}>{data.status}</Tag>
            });
         }

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
               <HomeOutlined />
               <CrumbLink>Beranda</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         <Text h3>Hi {personalUserData.fullName}, selamat datang di aplikasi pemeriksaan BPK</Text>
         <br />
         <Row gutter={16}>
            <Col span={12}>
               <Card bordered={false} title='Status Pemeriksaan Anda' >
                  <Row>
                     <Col span={6}>
                        <ResponsiveContainer width="90%" height={200}>
                           <PieChart width={730} height={250}>
                              <Pie
                                 data={taskChart}
                                 dataKey="value"
                                 nameKey="name"
                                 cx="50%"
                                 cy="50%"
                                 label={renderCustomizedLabel}
                                 labelLine={false}
                              >
                                 {taskChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                              </Pie>
                           </PieChart>
                        </ResponsiveContainer>
                     </Col>
                     <Col span={18}>
                        <Descriptions title="" bordered items={taskStatusCount} />
                     </Col>
                  </Row>


               </Card>
               <Card bordered={false} title='Pekerjaan Anda Saat Ini' >
                  <Row>
                     <Col span={24}>
                        <Table
                           columns={columns}
                           dataSource={taskTableData}
                           style={{ marginTop: '20px' }}
                           onRow={(row: any) => ({
                              onClick: () => {
                                 taskModal.open(row.taskNo);
                              },
                              style: { cursor: 'pointer' },
                           })} />
                     </Col>
                     {taskModal.render()}
                  </Row>
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
                  <ResponsiveContainer width="90%" height={200}>
                     <BarChart
                        width={600}
                        height={300}
                        data={progressBarData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                     >
                        <XAxis
                           dataKey='time'
                           domain={['auto', 'auto']}
                           name='Time'
                           tickFormatter={(unixTime) => dayjs(unixTime * 1000).format('DD/MM')}
                           type='number'
                        />
                        <YAxis type="category" dataKey="name" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="time" fill="#52c41a" >
                           {
                              progressBarData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))
                           }
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </Card>
            </Col>
         </Row>
      </Flex>
   );
};

export default Home;
