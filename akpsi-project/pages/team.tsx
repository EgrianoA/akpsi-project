import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { Flex } from '../components/styles/flex';
import { Input, Table, Button, Descriptions } from 'antd';
import { SearchOutlined, TeamOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useTeamModal from '../components/modals/TeamModal/useTeamModal'
import type { DescriptionsProps } from 'antd';


const columns = [
    {
        title: 'Nama Tim',
        dataIndex: 'taskTemplateName',
        key: 'taskTemplateName',
    },
];

const dataSource = [
    {
        key: '1',
        taskTemplateName: 'Tim-01',
    },
    {
        key: '2',
        taskTemplateName: 'Tim-02',
    },
];

const rowDescription: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Nama Tim',
        children: 'Tim-01',
        span: 2
    },
    {
        key: '2',
        label: 'Penempatan Penyelidikan',
        children: 'Lembaga X',
        span: 2
    },
    {
        key: '3',
        label: 'Ketua Tim',
        children: 'Team Lead 1',
        span: 2
    },
    {
        key: '4',
        label: 'Ketua Sub-Team',
        children: 'Sub Team Lead 1',
        span: 2
    },
    {
        key: '5',
        label: 'Anggota',
        children: (
            <>
                Investigator 1
                <br />
                Investigator 2
                <br />
            </>
        ),
        span: 12
    }
];

const teamDescription = () => {
    return <Descriptions title="Detail Tim" bordered items={rowDescription} />;
}

const Team = () => {
    const teamModal = useTeamModal();
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
                        placeholder="Cari Tugas"
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
                dataSource={dataSource}
                expandable={{ expandedRowRender: teamDescription, defaultExpandedRowKeys: ['0'] }}
                style={{ marginTop: '20px' }}
                onRow={(row: any) => ({
                    onClick: () => {
                        console.log(row)
                        teamModal.open();
                    },
                    style: { cursor: 'pointer' },
                })} />
            {teamModal.render()}
        </Flex>
    );
};

export default Team;
