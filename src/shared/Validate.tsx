import { reactive } from 'vue';
interface FData {
    [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
    key: keyof T
    message: string

} & (
        { type: "required" } |
        { type: "pattern", regex: RegExp }
    )
type Rules<T> = Rule<T>[]

export type { Rules,Rule,FData }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
    type Errors = {
        [k in keyof T]?:string[]
    }
    const errors: Errors = reactive({})
    rules.map(rule => {
        const { key, type, message } = rule
        const value = formData[key]
        switch (type) {
            case "required":
                if (value === null || value === undefined || value === "") {
                    errors[key] = errors[key] ?? []  //如果没有错误，返回一个空数组
                    errors[key].push(message)
                }
                break;
            case "pattern":
                if (value && !rule.regex.test(value.toString())) {
                    errors[key] = errors[key] ?? []  
                    errors[key].push(message)
                }
                break;
            default:
                return
        }
    })
    return errors
}