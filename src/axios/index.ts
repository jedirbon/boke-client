import axios from 'axios'

// 调试：打印环境变量
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL)

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    // 添加CORS相关配置
})

instance.interceptors.request.use(config => {
    // 调试：打印实际请求URL和请求头
    if (config.baseURL && config.url) {
    }
    return config
}, error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(res => {
    // 检查响应格式
    return res.data
}, error => {
   return error
})

export default instance

