import { Tag } from 'antd'
export const generateComplexityTag = (priority: string) => {
    switch (priority) {
        case 'Urgent':
        case 'Tinggi':
            return <Tag color="#ff4d4f">{priority}</Tag>
        case 'Menengah':
            return <Tag color="#d4b106">{priority}</Tag>
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
            return "#d4b106"
        default:
            return "#bfbfbf"
    }
}

export const generateRoleTagColor = (status: string) => {
    switch (status) {
        case 'Admin':
            return "volcano"
        case 'Ketua Tim':
        case 'Ketua Subtim':
            return "gold"
        case 'Penyidik':
            return "blue"
        default:
            return ""
    }
}