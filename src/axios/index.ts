import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
// 调试：打印环境变量
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL)

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    // 添加CORS相关配置
})

instance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.getToken
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(res => {
    // 检查响应格式
    const {code, msg} = res.data
    switch(code) {
        case 200:
            return res.data
        case 401:
            ElMessage.error(msg)
            return msg
        case 400:
            ElMessage.error(msg)
            return msg
        default:
            return res.data
    }
}, error => {
   return error
})

export default instance

