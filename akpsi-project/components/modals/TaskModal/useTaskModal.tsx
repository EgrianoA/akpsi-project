import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Select } from 'antd';
import { useCallback, useMemo, useState } from 'react';

const TaskModal = ({
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

    const { TextArea } = Input;

    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={'Tugas A'}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Detail Tugas Penyelidikan">
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
                                    label="Nama Tugas"
                                    name="taskName"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                    label="Kategori Tugas"
                                    name="taskCategory"
                                >
                                    <Select
                                        defaultValue=""
                                        style={{ width: 400 }}

                                        options={[
                                            { value: 'category1', label: 'Category A' },
                                            { value: 'category2', label: 'Category B' }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Deskripsi Tugas"
                                    name="taskDescription"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Form>
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
const useTaskModal = () => {
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
        render: () => <TaskModal onClose={actions.close} visible={visible} />,
    };
}

export default useTaskModal