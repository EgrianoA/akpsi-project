import { Tag } from 'antd'
export const generatePriorityTag = (priority: string) => {
    switch (priority) {
        case 'Urgent':
        case 'Tinggi':
            return <Tag color="#ff4d4f">{priority}</Tag>
        case 'Menengah':
            return <Tag color="#fadb14">{priority}</Tag>
        case 'Rendah':
            return <Tag color="#52c41a">{priority}</Tag>
        default:
            return <Tag>{priority}</Tag>
    }
}

export const generateStatusTagColor = (status: string) => {
    switch (status) {
        case 'Selesai':
            return "#52c41a"
        case 'Dalam Pengerjaan':
            return "#1677ff"
        case 'Memerlukan Informasi Lebih Lanjut':
            return "#fadb14"
        default:
            return "#bfbfbf"
    }
}