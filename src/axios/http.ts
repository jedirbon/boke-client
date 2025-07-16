import instance from './index'

const http = {
    get: (url: string, params?: any,headers?: any) => {
        return instance.get(url, { params,headers })
    },
    post: (url: string, data?: any,headers?: any) => {
        return instance.post(url, data,headers)
    },
    put: (url: string, data?: any,headers?: any) => {
        return instance.put(url, data,headers)
    },
    delete: (url: string, data: any) => {
        return instance.delete(url, data)
    }
}
export default http




