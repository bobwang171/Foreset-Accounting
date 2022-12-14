import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "vant";
import { mockItemCreate, mockItemIndex, mockItemIndexBalance, mockItemSummary, mockSession, mockTagIndex, mockTagShow } from "../mock/mock";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
    instance: AxiosInstance
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL
        })
    }
    get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
    }
    post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'post' })
    }
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'patch' })
    }
    delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
    }
}
const mock = (response: AxiosResponse) => {
    //通过url地址判断是否处于开发环境
    if (true || location.hostname !== 'localhost'
        && location.hostname !== '127.0.0.1'
        && location.hostname !== '192.168.3.57') {
        return false
    }
    switch (response.config?.params?._mock) {

        case "tagShow":
            [response.status, response.data] = mockTagShow(response.config)
            return true

        case "tagIndex":
            [response.status, response.data] = mockTagIndex(response.config)
            return true

        case "itemCreate":
            [response.status, response.data] = mockItemCreate(response.config)
            return true
        case "itemIndex":
            [response.status, response.data] = mockItemIndex(response.config)
            return true
        case "itemIndexBalance":
            [response.status, response.data] = mockItemIndexBalance(response.config)
        case "itemSummary":
            [response.status, response.data] = mockItemSummary(response.config)
            return true
    }
    return false
}

function isDev() {
    if (location.hostname !== 'localhost'
        && location.hostname !== '127.0.0.1'
        && location.hostname !== '192.168.3.57') { return false }
    return true
}

export const http = new Http(isDev() ? '' : 'http://121.196.236.94:3000')

http.instance.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        config.headers!.Authorization = `Bearer ${jwt}`
    }
    if (config?.params?._autoLoading === true) {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
    }
    return config
})
http.instance.interceptors.response.use((response) => {
    Toast.clear()
    return response
},
    (error) => {
        Toast.clear()
        throw error
    })


http.instance.interceptors.response.use((response) => {
    //使用Axios拦截器篡改response
    mock(response)
    return response
}, (error) => {
    if (mock(error.response)) {
        //遇到错误，如果可以使用mock篡改response
        return error.response
        //就正常返回这个response，相当于response成功了
    } else {
        throw error
        //如果mock不能篡改response，就直接throw这个错误
    }
})
http.instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const axiosError = error as AxiosError
            if (axiosError.response?.status === 429) {
                alert('你太频繁了')
            }
        }
        throw error
    }
)
