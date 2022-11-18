import { AxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';
type Mock = (config: AxiosRequestConfig) => [number, any]



export const mockSession: Mock = (config) => {
    return [200, {
        jwt: faker.word.adverb
    }]
}
export const mockTagIndex: Mock = (config) => {
    const { page, kind } = config.params
    let id = 0
    const createId = () => {
        id += 1
        return id
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

    if (kind === "expenses") {
        return [200, {
            resources:
                createTag(30)
        }]
    } else {
        return [200, {
            resources: createTag(25),
            pager: 1,
            per_page: 25
        }

        ]
    }



}