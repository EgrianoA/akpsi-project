import React from 'react';
import { Timeline } from 'antd';

const ActivityTimeline = () => {
    return (
        <Timeline
            items={[
                {
                    children: '19/11/2023 17:49 - User 1 menambahkan komentar',
                },
                {
                    children: '19/11/2023 16:10 - User 2 menambahkan komentar',
                },
                {
                    children: '19/11/2023 14:29 - User 1 menambahkan komentar',
                },
                {
                    children: '19/11/2023 11:39 - User 2 menambahkan komentar',
                },
                {
                    children: '19/11/2023 11:37 - User 1 mengubah status tugas',
                },
            ]}
        />
    )

}

export default ActivityTimeline