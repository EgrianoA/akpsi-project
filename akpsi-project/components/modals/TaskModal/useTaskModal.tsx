import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Select } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import taskCategory from '../../../public/dummyData/taskCategory.json'
import taskList from '../../../public/dummyData/taskList.json'

const TaskModal = ({
    onClose,
    visible,
    taskId
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
    taskId: string;
}) => {
    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );

    const { TextArea } = Input;
    const taskDetail = useMemo(() => taskList.find(task => task.taskId === taskId), [taskList, taskId])
    const taskCategoryOption = useMemo(() => taskCategory.map(category => ({ value: category.taskCategoryId, label: category.categoryName })), [taskCategory])

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
                                    <Input placeholder="" defaultValue={taskDetail?.taskName} />
                                </Form.Item>
                                <Form.Item
                                    label="Kategori Tugas"
                                    name="taskCategory"
                                >
                                    <Select
                                        defaultValue={taskDetail?.taskCategory}
                                        style={{ width: 400 }}

                                        options={taskCategoryOption}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Deskripsi Tugas"
                                    name="taskDescription"
                                >
                                    <TextArea rows={4} defaultValue={taskDetail?.taskDescription} />
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
    const [selectedTaskId, setSelectedTaskId] = useState()

    const actions = useMemo(() => {
        const close = () => setVisible(false);

        return {
            open: (taskId: string) => {
                setSelectedTaskId(taskId)
                setVisible(true)
            },
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => selectedTaskId && <TaskModal onClose={actions.close} taskId={selectedTaskId} visible={visible} />,
    };
}

export default useTaskModal