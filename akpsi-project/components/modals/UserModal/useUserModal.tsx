import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Select } from 'antd';
import { useCallback, useMemo, useState } from 'react';

const UserModal = ({
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
            title={'BPK-001'}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Detail Pengguna">
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
                                    label="No. Karyawan"
                                    name="employeeId"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Lengkap Karyawan"
                                    name="fullname"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                    label="Posisi"
                                    name="role"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}
const useUserModal = () => {
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
        render: () => <UserModal onClose={actions.close} visible={visible} />,
    };
}

export default useUserModal