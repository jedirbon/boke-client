import http from '@/axios/http'

export const loginApi = (data: any) => {
    return http.post('/login', data)
}

export const registerApi = (data: any) => {
    return http.post('/register', data)
}


