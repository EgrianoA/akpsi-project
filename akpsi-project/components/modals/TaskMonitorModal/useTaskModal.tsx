import { Row, Col, Card, Modal, ModalProps, Select, Form, Tag, Tabs, Space, Upload, message, InputNumber } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { WarningTwoTone, UpCircleTwoTone, MenuOutlined, MinusCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import CommentSection from './commentSection'
import ActivityTimeline from './activityTimeline'



const taskStatus = [
    { label: <Tag color="processing">Akan Dikerjakan</Tag>, value: 'todo' },
    { label: <Tag color="processing">Dalam Pengerjaan</Tag>, value: 'in-progress' },
    { label: <Tag color="warning">Menunggu Informasi Lebih Lanjut</Tag>, value: 'pending' },
    { label: <Tag color="success">Selesai</Tag>, value: 'done' }
]

const userList = [
    {
        value: 'A1',
        label: 'Investigator 1',
    },
    {
        value: 'B2',
        label: 'Investigator 2',
    },
    {
        value: 'C3',
        label: 'Investigator 3',
    },
    {
        value: 'D4',
        label: 'Investigator 4',
    },
]

const taskPriority = [
    { label: <Tag color="red"><WarningTwoTone twoToneColor="#fc2121" /> Urgent</Tag>, value: 'urgent' },
    { label: <Tag color="red"><UpCircleTwoTone twoToneColor="#fc2121" /> Tinggi</Tag>, value: 'high' },
    { label: <Tag color="warning"><MenuOutlined /> Menengah</Tag>, value: 'medium' },
    { label: <Tag><MinusCircleOutlined /> Rendah</Tag>, value: 'low' }
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
    const { Dragger } = Upload;
    return (
        <Modal
            footer={null}
            onCancel={closeModal}
            open={visible}
            title={'TUGAS/XI/2023 / TASK-01'}
            width={'70vw'}
            destroyOnClose
        >
            <Row gutter={8}>
                <Col span={16}>

                    <Card title='Judul Tugas'>
                        <Space direction="vertical">
                            <b>Deskripsi Tugas:</b>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                                    defaultValue="todo"
                                    style={{ width: 180 }}
                                    options={taskStatus}
                                    tagRender={({ value }) => taskStatus.find(status => status.value === value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ditugaskan ke"
                                name="assignedTo"
                            >
                                <Select
                                    defaultValue="A1"
                                    style={{ width: 180 }}
                                    options={userList}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Prioritas"
                                name="priority"
                            >
                                <Select
                                    defaultValue="medium"
                                    style={{ width: 180 }}
                                    options={taskPriority}
                                    tagRender={({ value }) => taskPriority.find(priority => priority.value === value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Estimasi pemeriksaan"
                                name="estimation"
                            >
                                <InputNumber addonAfter="Hari" step="0.5" style={{ maxWidth: '120px' }} defaultValue='1' />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

            </Row>
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