import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Tabs } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import type { TabsProps } from 'antd';
import DefaultForm from './defaultForm'
import allTeam from '../../../public/dummyData/teamList.json'
import allUser from '../../../public/dummyData/userList.json'

const onChange = (key: string) => {
    console.log(key);
};

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

    const tabItems: TabsProps['items'] = useMemo(() => {
        const defaultTeam = allTeam[0]
        return [
            {
                key: 1,
                label: 'Evaluasi Umum',
                children: <DefaultForm kind='task' />,
            },
            {
                key: 2,
                label: allUser.find(user => user.employeeNumber === defaultTeam.subteamLead).fullName,
                children: <DefaultForm kind='individual' employeeId={defaultTeam.subteamLead} />,
            },
            ...defaultTeam.teamMember.map((member, index) => ({
                key: index + 3,
                label: allUser.find(user => user.employeeNumber === member).fullName,
                children: <DefaultForm kind='individual' employeeId={member} />,
            }))
        ]
    }, [allTeam])

    console.log(tabItems)

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
                            <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
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