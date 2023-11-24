import { Row, Col, Card, Modal, ModalProps, Select, Form, Tag, Tabs, Space, Upload, message, InputNumber } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { WarningTwoTone, UpCircleTwoTone, MenuOutlined, MinusCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import CommentSection from './commentSection'
import ActivityTimeline from './activityTimeline'
import allMonitorTaskList from '../../../public/dummyData/allMonitorTaskList.json'
import allUserData from '../../../public/dummyData/userList.json'
import { generateComplexityTag, generateStatusTagColor } from '../../../utilities/generateTag'


const taskStatus = ['Akan Dikerjakan', 'Dalam Pengerjaan', 'Memerlukan Informasi Lebih Lanjut', 'Selesai']

const taskPriority = [
    { label: <Tag color="red"><WarningTwoTone twoToneColor="#fc2121" /> Urgent</Tag>, value: 'Urgent' },
    { label: <Tag color="red"><UpCircleTwoTone twoToneColor="#fc2121" /> Tinggi</Tag>, value: 'Tinggi' },
    { label: <Tag color="warning"><MenuOutlined /> Menengah</Tag>, value: 'Menengah' },
    { label: <Tag><MinusCircleOutlined /> Rendah</Tag>, value: 'Rendah' }
]

const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const tabItems = [
    {
        key: '1',
        label: 'Komentar',
        children: <CommentSection />,
    },
    {
        key: '2',
        label: 'Aktivitas',
        children: <ActivityTimeline />,
    },
]

const TaskMonitorModal = ({
    onClose,
    visible,
    taskNumber
}: {
    onClose: ModalProps['onCancel'];
    visible: boolean;
    taskNumber: string;
}) => {
    const closeModal = useCallback(
        (e) => {
            onClose(e);
        },
        [onClose]
    );
    const { Dragger } = Upload;
    const taskData = allMonitorTaskList.find(task => task.taskNumber === taskNumber)

    const investigatorList = allUserData.filter(user => user.role === 'Penyidik').map((investigator) => ({
        label: investigator.fullName,
        value: investigator.employeeNumber
    }))

    const taskStatusDropdown = taskStatus.map((status) => ({
        label: <Tag color={generateStatusTagColor(status)}>{status}</Tag>,
        value: status
    }))

    const tabItems = useMemo(() => {
        return [
            {
                key: '1',
                label: 'Komentar',
                children: <CommentSection taskNumber={taskData.taskNumber} />,
            },
            {
                key: '2',
                label: 'Aktivitas',
                children: <ActivityTimeline taskNumber={taskData.taskNumber} />,
            },
        ]
    }, [])
    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={taskData.taskNumber}
            width={'70vw'}
            destroyOnClose
        >
            <Row gutter={8}>
                <Col span={16}>

                    <Card title={taskData.taskName}>
                        <Space direction="vertical">
                            <b>Deskripsi Tugas:</b>
                            {taskData.taskDescription}
                            <b>Lampiran: </b>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Klik atau geser file kesini untuk mengunggah lampiran</p>
                                <p className="ant-upload-hint">
                                    Silahkan unggah file dengan format .pdf, .doc, .png, .jpg
                                </p>
                            </Dragger>
                            <Tabs defaultActiveKey="1" items={tabItems} />
                        </Space>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title='' >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 18 }}
                            style={{ maxWidth: 600, margin: '0px' }}
                            autoComplete="off"
                            labelAlign="left"
                            labelWrap
                        >
                            <Form.Item
                                label="Status"
                                name="status"
                            >
                                <Select
                                    defaultValue={taskData.status}
                                    style={{ width: 180 }}
                                    options={taskStatusDropdown}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ditugaskan ke"
                                name="assignedTo"
                            >
                                <Select
                                    defaultValue={taskData.assignedTo}
                                    style={{ width: 180 }}
                                    options={investigatorList}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Kompleksitas"
                                name="complexity"
                            >
                                <Select
                                    defaultValue={taskData.priority}
                                    style={{ width: 180 }}
                                    options={taskPriority}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Estimasi pemeriksaan"
                                name="estimation"
                            >
                                <InputNumber addonAfter="Hari" step="0.5" style={{ maxWidth: '120px' }} defaultValue={taskData.estimation} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

            </Row>
        </Modal >
    )
}
const useTaskMonitorModal = () => {
    const [visible, setVisible] = useState(false);
    const [currentTaskNumber, setCurrentTaskNumber] = useState(null)

    const actions = useMemo(() => {
        const close = () => setVisible(false);

        return {
            open: (taskNumber: string) => {
                setVisible(true)
                setCurrentTaskNumber(taskNumber)
            },
            close,
        };
    }, [setVisible]);

    return {
        ...actions,
        render: () => currentTaskNumber && <TaskMonitorModal onClose={actions.close} visible={visible} taskNumber={currentTaskNumber} />,
    };
}

export default useTaskMonitorModal