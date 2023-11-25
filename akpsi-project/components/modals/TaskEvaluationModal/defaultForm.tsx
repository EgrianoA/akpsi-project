import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Form, Space, Input } from 'antd';
import questionnaire from '../../../public/dummyData/evaluationQuestionnaire.json'

const QuestionnaireOptions = () => {
    return <Radio.Group>
        <Space direction="vertical">
            <Radio value={1}>Sangat Baik</Radio>
            <Radio value={2}>Baik</Radio>
            <Radio value={3}>Cukup</Radio>
            <Radio value={4}>Kurang Baik</Radio>
            <Radio value={5}>Buruk</Radio>
        </Space>
    </Radio.Group>
}

const DefaultForm = ({ kind, employeeId }: { kind: 'task' | 'individual', employeeId: string }) => {
    const { TextArea } = Input
    const taskQuestionnaire = questionnaire.taskQuestionnaire.map((questionnaire, index) => ({
        id: `task-question-${index}`,
        numbering: index + 1,
        question: questionnaire
    }))
    const individualQuestionnaire = questionnaire.individualQuestionnaire.map((questionnaire, index) => ({
        id: `individual-question-${index}-${employeeId}`,
        numbering: index + 1,
        question: questionnaire
    }))

    const questionnaireList = kind === 'task' ? taskQuestionnaire : individualQuestionnaire
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
            {questionnaireList.map(questionnaire => (
                <Form.Item
                    label={`${questionnaire.numbering}. ${questionnaire.question}`}
                    name={questionnaire.id}
                >
                    <QuestionnaireOptions />
                </Form.Item>
            ))}
            {kind === 'task' ? <Form.Item
                label={`Saran dan masukkan terhadap penyelidikan ini`}
                name='task-question-advice'
            >
                <TextArea row={4} />
            </Form.Item> : <Form.Item
                label={`Saran dan masukkan terhadap penyidik ini`}
                name='individual-question-advice'
            >
                <TextArea row={4} />
            </Form.Item>}

        </Form >
    )

}

export default DefaultForm