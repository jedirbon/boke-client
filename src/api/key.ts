import http from '@/axios/http'

export const getPublicKey = () => {
    return http.get('/publicKey')
}

