import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Tabs } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import type { TabsProps } from 'antd';
import DefaultForm from './defaultForm'

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Evaluasi Umum',
        children: <DefaultForm />,
    },
    {
        key: '2',
        label: 'Investigator 1',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Investigator 2',
        children: 'Content of Tab Pane 3',
    },
];

const TaskEvaluationModal = ({
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
            title={'Evaluasi Kinerja Pemeriksaan'}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="" extra={<Button type="primary" htmlType="submit" style={{ marginLeft: 'auto' }}>
                            Simpan
                        </Button>}>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </Card>
                    </Col>
                </Row>

            </Space>
        </Modal>
    )
}
const useTaskEvaluationModal = () => {
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
        render: () => <TaskEvaluationModal onClose={actions.close} visible={visible} />,
    };
}

export default useTaskEvaluationModal