import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Tag, Descriptions } from 'antd';
import { SearchOutlined, FileDoneOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTaskEvaluationModal from '../components/modals/TaskEvaluationModal/useTaskEvaluationModal'
import type { DescriptionsProps } from 'antd';
import allTeam from '../public/dummyData/teamList.json'
import allUser from '../public/dummyData/userList.json'

const columns = [
    {
        title: 'Evaluasi',
        dataIndex: 'evaluationName',
        key: 'evaluationName',
    },
    {
        title: 'Status Evaluasi',
        dataIndex: 'evaluationStatus',
        key: 'evaluationStatus',
    },
];

const dataSource = [
    {
        key: '1',
        evaluationName: 'Evaluasi Tugas Pemeriksaan TA 2022 S.D SEMESTER I TA 2023 PADA LPP TVRI',
        evaluationStatus: <Tag color="processing">Belum Selesai</Tag>
    },
];

const teamDescription = () => {
    const defaultTeam = allTeam[0]
    const evaluationDescription = [
        {
            key: 1,
            label: 'Evaluasi Secara Umum',
            children: <Tag color="processing">Belum Selesai</Tag>,
            span: 18
        },
        {
            key: 2,
            label: `Evaluasi ${allUser.find(user => user.employeeNumber === defaultTeam.subteamLead).fullName}`,
            children: <Tag color="processing">Belum Selesai</Tag>,
            span: 18
        },
        ...defaultTeam.teamMember.map((member, index) => ({
            key: index + 3,
            label: `Evaluasi ${allUser.find(user => user.employeeNumber === member).fullName}`,
            children: <Tag color="processing">Belum Selesai</Tag>,
            span: 18
        }))
    ]
    return <Descriptions title="Status Evaluasi" bordered items={evaluationDescription} />;
}

const Evaluation = () => {
    const taskEvaluationModal = useTaskEvaluationModal();
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
                    <FileDoneOutlined />
                    <CrumbLink>Evaluasi</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Evaluasi Kinerja Pemeriksaan</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>Evaluasi Kinerja Pemeriksaan</Text>
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
                        placeholder="Cari Evaluasi"
                        suffix={
                            <SearchOutlined />
                        }
                    />
                </Flex>
            </Flex>
            <br />
            <Table
                columns={columns}
                dataSource={dataSource}
                expandable={{ expandedRowRender: teamDescription, defaultExpandedRowKeys: ['0'] }}
                style={{ marginTop: '20px' }}
                onRow={(row: any) => ({
                    onClick: () => {
                        taskEvaluationModal.open();
                    },
                    style: { cursor: 'pointer' },
                })} />
            {taskEvaluationModal.render()}
        </Flex>
    );
};

export default Evaluation;
