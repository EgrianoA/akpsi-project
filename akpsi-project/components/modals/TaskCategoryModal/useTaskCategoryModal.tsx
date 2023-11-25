import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import taskCategory from '../../../public/dummyData/taskCategory.json'

const TaskCategoryModal = ({
    onClose,
    visible,
    taskCategoryId
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
    taskCategoryId: string
}) => {
    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );

    const taskCategoryDetail = useMemo(() => taskCategory.find(category => category.taskCategoryId === taskCategoryId), [taskCategory, taskCategoryId])

    const { TextArea } = Input;

    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={'Category A'}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Detail Kategori Tugas">
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
                                    label="Name Kategori Tugas"
                                    name="taskCategoryName"
                                >
                                    <Input placeholder="" defaultValue={taskCategoryDetail.categoryName} />
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
const useTaskCategoryModal = () => {
    const [visible, setVisible] = useState(false);
    const [taskCategoryId, setTaskCategoryId] = useState();

    const actions = useMemo(() => {
        const close = () => setVisible(false);

        return {
            open: (selectedTaskCategoryId: string) => {
                setTaskCategoryId(selectedTaskCategoryId)
                setVisible(true)
            },
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => taskCategoryId && <TaskCategoryModal onClose={actions.close} taskCategoryId={taskCategoryId} visible={visible} />,
    };
}

export default useTaskCategoryModal