import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Form, Space } from 'antd';


// Create questionnaire array
const generalQuestionnaire = [
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
    {
        question: "",
        id: "general-question-",
    },
]


const personalQuestionnaire = [
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
    {
        question: "",
        id: "personal-question-",
    },
]

const QuestionnaireOptions = () => {
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return <Radio.Group onChange={onChange}>
        <Space direction="vertical">
            <Radio value={1}>Sangat Baik</Radio>
            <Radio value={2}>Baik</Radio>
            <Radio value={3}>Cukup</Radio>
            <Radio value={4}>Kurang Baik</Radio>
            <Radio value={4}>Buruk</Radio>
        </Space>
    </Radio.Group>
}

const DefaultForm = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600, margin: '0px' }}
            autoComplete="off"
            labelAlign="left"
            labelWrap
        >

            <Form.Item
                label="Pertanyaan 1"
                name="question1"
            >
                <QuestionnaireOptions />
            </Form.Item>
        </Form>
    )

}

export default DefaultForm