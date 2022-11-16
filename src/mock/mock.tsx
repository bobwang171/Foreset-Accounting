import { AxiosRequestConfig } from 'axios';
type Mock = (config: AxiosRequestConfig) => [number, any]

export const mockSession: Mock = (config) => {
    return [200, {
        jwt: "111"
    }]
}