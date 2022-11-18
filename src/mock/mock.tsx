import { AxiosRequestConfig } from 'axios';
import { Icon } from '../shared/icon';
import { faker } from '@faker-js/faker';
type Mock = (config: AxiosRequestConfig) => [number, any]



export const mockSession: Mock = (config) => {
    return [200, {
        jwt: "111"
    }]
}
export const mockTagIndex: Mock = (config) => {

    const createId = () => {
        let i = 0
        i += 1
        return i
    }

    const createTag = (n = 1) =>
        Array.from({ length: n }).map(
            () => ({
                id: createId(),
                name: faker.name.firstName(),
                sign: faker.internet.emoji(),
                kind: config.params.kind

            })


        )

    if (config.params.kind === "expenses") {
        return [200, {
            resources:
                createTag(30)
        }]
    } else {
        return [200, {
            resources:
                createTag(30)
        }
        ]
    }



}