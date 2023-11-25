import React, { useState, useMemo } from 'react';
import { Avatar, List, Input, Form, Button, Row, Col } from 'antd';
import allActivity from '../../../public/dummyData/taskActivity.json'
import userList from '../../../public/dummyData/userList.json'

const CommentSection = ({ taskNumber }: { taskNumber: string }) => {
    const currentUser = userList[0]
    const commentData = useMemo(() => {
        return allActivity.filter(activity => activity.taskNumber === taskNumber && activity.activity.kind === 'comment').map(comment => {
            const commenter = userList.find(user => user.employeeNumber === comment.activity.activityBy)
            return { 
                title: `${commenter.fullName} - ${comment.activity.date}`,
                comment: comment.activity.description,
                profilePicture: commenter.profilePicture
             }
        })
    }, [allActivity, userList, taskNumber])

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
                    <Avatar src={currentUser.profilePicture} />
                </Col>
                <Col span={22}>
                    <Form.Item>
                        <TextArea rows={4} value={value} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                            Tambahkan komentar
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <List
                itemLayout="horizontal"
                dataSource={commentData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.profilePicture} />}
                            title={item.title}
                            description={item.comment}
                        />
                    </List.Item>
                )}
            />
        </>

    )
}

export default CommentSection