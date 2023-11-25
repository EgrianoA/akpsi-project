import React, { useMemo } from 'react';
import { Timeline } from 'antd';
import allActivity from '../../../public/dummyData/taskActivity.json'
import userList from '../../../public/dummyData/userList.json'

const ActivityTimeline = ({ taskNumber }: { taskNumber: string }) => {

    const taskActivity = useMemo(() => {
        return allActivity.filter(activity => activity.taskNumber === taskNumber).map(activity => {
            let content = ''
            if (activity.activity.kind === 'comment') {
                const commenterName = userList.find(user => user.employeeNumber === activity.activity.activityBy).fullName
                content = `${commenterName} menambahkan komentar`
            } else {
                content = activity.activity.description
            }
            return { children: `${activity.activity.date} - ${content}` }
        })
    }, [allActivity, userList, taskNumber])
    return (
        <Timeline
            items={taskActivity}
        />
    )

}

export default ActivityTimeline