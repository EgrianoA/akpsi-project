import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Select } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import userList from '../../../public/dummyData/userList.json'

const userRole = [{ value: 'Admin' }, { value: 'Ketua Tim' }, { value: 'Ketua Subtim' }, { value: 'Penyidik' }]

const UserModal = ({
    onClose,
    visible,
    employeeNumber
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
    employeeNumber: string
}) => {
    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );

    const { TextArea } = Input;
    const employeeDetail = useMemo(() => userList.find(user => user.employeeNumber === employeeNumber), [userList, employeeNumber])

    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={employeeDetail.employeeNumber}
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
                                    <Input placeholder="" defaultValue={employeeDetail.employeeNumber} />
                                </Form.Item>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                >
                                    <Input placeholder="" defaultValue={employeeDetail.username} />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Lengkap Karyawan"
                                    name="fullname"
                                >
                                    <Input placeholder="" defaultValue={employeeDetail.fullName} />
                                </Form.Item>
                                <Form.Item
                                    label="Peran"
                                    name="role"
                                >
                                    <Select
                                        defaultValue={employeeDetail.role}
                                        style={{ width: 180 }}
                                        options={userRole}
                                    />
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
    const [employeeNumber, setEmployeeNumber] = useState();

    const actions = useMemo(() => {
        const close = () => setVisible(false);

        return {
            open: (employeeNumber: string) => {
                setEmployeeNumber(employeeNumber)
                setVisible(true)
            },
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => employeeNumber && <UserModal employeeNumber={employeeNumber} onClose={actions.close} visible={visible} />,
    };
}

export default useUserModal