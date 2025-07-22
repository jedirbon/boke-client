import http from '@/axios/http'

export const getCategoryListApi = (data: any) => {
    return http.get('/api/category/list', data)
}

export const addCategoryApi = (data: any) => {
    return http.post('/api/category/add', data)
}

export const delCategoryApi = (data:any) => {
    return http.delete('/api/category/del', data)
}

export const uploadApi = (data:any) => {
    return http.post('/api/category/cover', data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

