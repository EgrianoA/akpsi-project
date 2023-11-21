import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Table, Transfer, Button } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import difference from 'lodash/difference';


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

const taskListData = [
    {
        key: 'A1',
        taskName: 'Task A',
        taskDescription: 'Task A Description',
        parentTask: '1'
    },
    {
        key: 'B2',
        taskName: 'Task B',
        taskDescription: 'Task B Description',
        parentTask: '1'
    },
    {
        key: 'C3',
        taskName: 'Task C',
        taskDescription: 'Task C Description',
        parentTask: '1'
    },
    {
        key: 'D4',
        taskName: 'Task D',
        taskDescription: 'Task D Description',
        parentTask: '1'
    },
    {
        key: 'G7',
        taskName: 'Task G',
        taskDescription: 'Task G Description',
        parentTask: '2'
    },
    {
        key: 'H8',
        taskName: 'Task H',
        taskDescription: 'Task H Description',
        parentTask: '2'
    },
];

const originTargetKeys = ['G7', 'H8']

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

const TaskTemplateModal = ({
    onClose,
    visible,
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
}) => {
    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );

    const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);
    const onChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={'Template Tugas A'}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Detail Template Tugas">
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
                                    label="Nama Template"
                                    name="taskTemplateName"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Daftar Task">
                            <TableTransfer
                                dataSource={taskListData}
                                targetKeys={targetKeys}
                                showSearch={true}
                                onChange={onChange}
                                filterOption={(inputValue, item) =>
                                    item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                                }
                                leftColumns={taskTableColumn}
                                rightColumns={taskTableColumn}
                            />
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
const useTaskTemplateModal = () => {
    const [visible, setVisible] = useState(false);

    const actions = useMemo(() => {
        const close = () => setVisible(false);

        return {
            open: () => setVisible(true),
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => <TaskTemplateModal onClose={actions.close} visible={visible} />,
    };
}

export default useTaskTemplateModal