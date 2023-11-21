import { Row, Col, Card, Modal, ModalProps, Form, Input, Space, Button, Select, Upload } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';

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

const UploadExcelModal = ({
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
            title={''}
            width={'70vw'}
            destroyOnClose
        >
            <Space direction="vertical" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Card title="Import Excel Tugas Pemeriksaan">
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Klik atau geser file kesini untuk mengunggah tugas pemeriksaan</p>
                                <p className="ant-upload-hint">
                                    Silahkan unggah file dengan format .xlsx
                                </p>
                            </Dragger>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}

const useUploadExcelModal = () => {
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
        render: () => <UploadExcelModal onClose={actions.close} visible={visible} />,
    };
}

export default useUploadExcelModal