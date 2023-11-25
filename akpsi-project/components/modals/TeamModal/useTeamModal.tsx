import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Table, Transfer, Button, Select } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import difference from 'lodash/difference';
import teamList from '../../../public/dummyData/teamList.json'
import userList from '../../../public/dummyData/userList.json'
import allTask from '../../../public/dummyData/taskList.json'
import allTaskTemplate from '../../../public/dummyData/taskTemplate.json'


interface RecordType {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
    tag: string;
}

interface DataType {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
    tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: DataType[];
    leftColumns: ColumnsType<DataType>;
    rightColumns: ColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
    <Transfer {...restProps}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection: TableRowSelection<TransferItem> = {
                getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter((item) => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys as string[], selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key as string, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key as string, !listSelectedKeys.includes(key as string));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const originTaskTargetKeys = ['G7', 'H8']

const taskTableColumn = [
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

const memberTableColumn = [
    {
        title: 'Nama Anggota',
        dataIndex: 'memberName',
        key: 'memberName',
    },
]

const TeamModal = ({
    onClose,
    visible,
    teamId,
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
    teamId: string;
}) => {
    const allTaskData = useMemo(() => allTask.map(task => ({
        key: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription
    })), [allTask])
    const allTaskTemplateData = useMemo(() => allTaskTemplate.map(template => ({
        value: template.templateId,
        label: template.templateName,
        taskList: template.taskList
    })), [allTaskTemplate])
    const teamDetails = useMemo(() => teamList.find(team => team.teamId === teamId), [teamList, teamId])
    const teamLeadOptions = useMemo(() => userList.filter(user => user.role === 'Ketua Tim').map(teamLead => ({ value: teamLead.employeeNumber, label: teamLead.fullName })), [userList])
    const subteamLeadOptions = useMemo(() => userList.filter(user => user.role === 'Ketua Subtim').map(subteamLead => ({ value: subteamLead.employeeNumber, label: subteamLead.fullName })), [userList])
    const investigatorMemberList = useMemo(() => userList.filter(user => user.role === 'Penyidik').map(investigator => ({ key: investigator.employeeNumber, memberName: investigator.fullName })), [userList])

    const [selectedTemplate, setSelectedTemplate] = useState<string>('')
    const [taskTargetKeys, setTaskTargetKeys] = useState<string[]>(teamDetails.teamTask);
    const [memberTargetKeys, setMemberTargetKeys] = useState<string[]>(teamDetails.teamMember);
    const [taskData, setTaskData] = useState(allTaskData)
    const onTaskChange = (nextTargetKeys: string[]) => {
        setTaskTargetKeys(nextTargetKeys);
    };
    const onMemberChange = (nextTargetKeys: string[]) => {
        setMemberTargetKeys(nextTargetKeys);
    };

    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );

    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={`${teamDetails.teamId} - ${teamDetails.teamName}`}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Detail Tim Penyelidikan">
                            <Form
                                name="basic"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                                style={{ maxWidth: 600, margin: '0px' }}
                                autoComplete="off"
                                labelAlign="left"
                                labelWrap
                            >
                                <Form.Item
                                    label="Nama Tim"
                                    name="teamName"
                                >
                                    <Input placeholder="" defaultValue={teamDetails.teamName} />
                                </Form.Item>
                                <Form.Item
                                    label="Lokasi Penyelidikan"
                                    name="investigationLocation"
                                >
                                    <Input placeholder="" defaultValue={teamDetails.investigationLocation} />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Ketua Tim"
                                    name="teamLead"
                                >
                                    <Select
                                        defaultValue={teamDetails.teamLead}
                                        style={{ width: 400 }}

                                        options={teamLeadOptions}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Ketua Sub-tim"
                                    name="subTeamLead"
                                >
                                    <Select
                                        defaultValue={teamDetails.subteamLead}
                                        style={{ width: 400 }}
                                        options={subteamLeadOptions}
                                    />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Daftar Anggota">
                            <Space direction="vertical" style={{ display: 'flex' }}>
                                <TableTransfer
                                    dataSource={investigatorMemberList}
                                    targetKeys={memberTargetKeys}
                                    showSearch={true}
                                    onChange={onMemberChange}
                                    filterOption={(inputValue, item) =>
                                        item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                                    }
                                    leftColumns={memberTableColumn}
                                    rightColumns={memberTableColumn}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Daftar Tugas Pemeriksaan">
                            <Space direction="vertical" style={{ display: 'flex' }}>
                                <Space>
                                    Template Tugas:
                                    <Select
                                        allowClear
                                        defaultValue={selectedTemplate}
                                        style={{ width: 400 }}
                                        options={allTaskTemplateData}
                                        onChange={(value) => {
                                            setSelectedTemplate(value || '')
                                            if (!value) {
                                                setTaskData(allTaskData)
                                            } else {
                                                const selectedTaskTemplate = allTaskTemplateData.find(template => template.value === value)
                                                const taskByTemplate = allTaskData.filter(task => selectedTaskTemplate.taskList.some(taskTemplateList => taskTemplateList === task.key))
                                                setTaskData(taskByTemplate.map(task => ({
                                                    key: task.key,
                                                    taskName: task.taskName,
                                                    taskDescription: task.taskDescription
                                                })))

                                            }


                                        }}
                                    />
                                </Space>

                                <TableTransfer
                                    dataSource={taskData}
                                    targetKeys={taskTargetKeys}
                                    showSearch={true}
                                    onChange={onTaskChange}
                                    filterOption={(inputValue, item) =>
                                        item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                                    }
                                    leftColumns={taskTableColumn}
                                    rightColumns={taskTableColumn}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={22} />
                    <Col span={2}>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 'auto' }}>
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}
const useTeamModal = () => {
    const [visible, setVisible] = useState(false);
    const [teamId, setTeamId] = useState(null);

    const actions = useMemo(() => {
        const close = () => { 
            setTeamId();
            setVisible(false); }

        return {
            open: (teamId: string) => {
                setTeamId(teamId)
                setVisible(true)
            },
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => teamId && <TeamModal onClose={actions.close} teamId={teamId} visible={visible} />,
    };
}

export default useTeamModal