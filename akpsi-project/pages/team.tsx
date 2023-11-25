import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Button, Descriptions } from 'antd';
import { SearchOutlined, TeamOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTeamModal from '../components/modals/TeamModal/useTeamModal'
import type { DescriptionsProps } from 'antd';
import rawTeamList from '../public/dummyData/teamList.json'
import allUser from '../public/dummyData/userList.json'


const columns = [
    {
        title: 'Nama Tim',
        dataIndex: 'teamName',
        key: 'teamName',
    },
];

const teamDescription = (record) => {
    const teamDetails = rawTeamList.find(team => team.teamId === record.key)
    const rowDescription: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nama Tim',
            children: teamDetails.teamName,
            span: 2
        },
        {
            key: '2',
            label: 'Lokasi Penyelidikan',
            children: teamDetails.investigationLocation,
            span: 2
        },
        {
            key: '3',
            label: 'Ketua Tim',
            children: allUser.find(user => user.employeeNumber === teamDetails.teamLead)?.fullName || '',
            span: 2
        },
        {
            key: '4',
            label: 'Ketua Sub-Team',
            children: allUser.find(user => user.employeeNumber === teamDetails.subteamLead)?.fullName || '',
            span: 2
        },
        {
            key: '5',
            label: 'Anggota',
            children: (
                <>
                    {teamDetails.teamMember.map(member => (
                        <>
                            {allUser.find(user => user.employeeNumber === member)?.fullName || ''}
                            < br />
                        </>
                    ))}
                </>
            ),
            span: 12
        }
    ];

    return <Descriptions title="Detail Tim" bordered items={rowDescription} />;
}

const Team = () => {
    const teamModal = useTeamModal();

    const teamList = useMemo(() => { return rawTeamList.map(team => ({ key: team.teamId, teamName: team.teamName })) }, [rawTeamList])
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
                    <TeamOutlined />
                    <CrumbLink>Tim</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink>Daftar Tim</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>Daftar Tim Penyelidikan</Text>
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
                        placeholder="Cari Tim"
                        suffix={
                            <SearchOutlined />
                        }
                    />
                </Flex>
                <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'}>
                    <Button type="primary" icon={<PlusCircleOutlined />}>
                        Tambah Tim
                    </Button>
                </Flex>
            </Flex>
            <br />
            <Table
                columns={columns}
                dataSource={teamList}
                expandable={{ expandedRowRender: (record) => teamDescription(record), defaultExpandedRowKeys: ['0'] }}
                style={{ marginTop: '20px' }}
                onRow={(row: any) => ({
                    onClick: () => {
                        teamModal.open(row.key);
                    },
                    style: { cursor: 'pointer' },
                })} />
            {teamModal.render()}
        </Flex>
    );
};

export default Team;
