import http from '@/axios/http'

export const getArticleListApi = (data: any) => {
    return http.get('/api/article/list', data)
}

export const addArticleApi = (data: any) => {
    return http.post('/api/article/add', data)
}

export const delArticleApi = (data:any) => {
    return http.delete('/api/article/del', data)
}

export const updateArticleApi = (data:any) => {
    return http.put('/api/article/update', data)
}
