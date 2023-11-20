import React, { useState } from 'react';
import { Avatar, List, Input, Form, Button, Row, Col } from 'antd';


interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const data = [
    {
        title: 'User 1 - 19/11/2023 17:49',
    },
    {
        title: 'User 2 - 19/11/2023 16:10',
    },
    {
        title: 'User 1 - 19/11/2023 14:29',
    },
    {
        title: 'User 2 - 19/11/2023 11:39',
    },
];

const CommentSection = () => {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const { TextArea } = Input;


    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Row gutter={10}>
                <Col>
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" alt="Han Solo" />
                </Col>
                <Col span={22}>
                    <Form.Item>
                        <TextArea rows={4} value={value} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                            Add Comment
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </>

    )
}

export default CommentSection