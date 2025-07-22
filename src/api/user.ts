import http from '@/axios/http'

export const loginApi = (data: any) => {
    return http.post('/login', data)
}

export const registerApi = (data: any) => {
    return http.post('/register', data)
}

export const uploadUserApi = (data:any) => {
    return http.put('/api/user/upload', data)
}

export const getUserDetailsApi = () => {
    return http.get('/api/user/details')
}
