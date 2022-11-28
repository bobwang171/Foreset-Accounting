import { AxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
type Mock = (config: AxiosRequestConfig) => [number, any]

let id = 0
const createId = () => {
    id += 1
    return id
}
export const mockItemIndexBalance: Mock = (config) => {
    return [200, {
        expenses: 9900,
        income: 9900,
        balance: 0
    }]
}

export const mockItemSummary: Mock = (config) => {
    return [200, {
        "groups": [
            {
                "happen_at": "2018-06-18",
                "amount": 300
            },
            {
                "happen_at": "2018-06-19",
                "amount": 200
            },
            {
                "happen_at": "2018-06-20",
                "amount": 100
            }
        ],
        "total": 600
    }]
}

export const mockItemCreate: Mock = (config) => {
    return [200, {
        "id": 16443,
        "user_id": 9996,
        "amount": 9900,
        "note": null,
        "tag_ids": [27038],
        "happen_at": "2020-10-30T00:00:00.000+08:00",
        "created_at": "2022-11-15T22:10:02.300+08:00",
        "updated_at": "2022-11-15T22:10:02.300+08:00",
        "kind": "expenses",
        "deleted_at": null
    }]
}
faker.setLocale("zh_CN")

export const mockSession: Mock = (config) => {
    return [200, {
        jwt: faker.lorem.word()
    }]

}
export const mockItemIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26
    const createPaper = (page = 1) => ({
        page,
        per_page,
        count,
    })
    const createItem = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            name: faker.lorem.word(),
            sign: faker.internet.emoji(),
            user_id: createId(),
            amount: Math.floor(Math.random() * 10000),
            happen_at: dayjs().format("YYYY-MM-DD HH:MM"),
            kind: config.params.kind,

        }))
    const createBody = (n = 1, attrs?: any) => ({
        resources: createItem(n),
        pager: createPaper(page),
    })
    if (!page || page === 1) {
        return [200, createBody(25)]
    } else if (page === 2) {
        return [200, createBody(1)]
    } else {
        return [200, {}]
    }
}
export const mockTagShow: Mock = (config) => {
    const createTag = (attrs?: any) =>
    ({
        id: createId(),
        name: faker.name.firstName(),
        sign: faker.internet.emoji(),
        kind: "expenses",
    })
    return [200, { resources: createTag() }]
}
export const mockTagEdit: Mock = (config) => {
    const createTag = (attrs?: any) =>
    ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: "expenses",
        ...attrs
    })
    return [200, { resources: createTag() }]
}


export const mockTagIndex: Mock = (config) => {
    const { page, kind } = config.params


    const createTag = (n = 1) => {
        return Array.from({ length: n }).map(
            () => ({
                id: createId(),
                name: faker.word.noun(),
                sign: faker.internet.emoji(),
                kind: config.params.kind,

            })
        )
    }

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