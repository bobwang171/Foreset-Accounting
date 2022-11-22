import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { hasError, Rules, validate } from '../../shared/Validate';
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
export const TagLayout = defineComponent({
    props: {
        id: Number
    },
    setup: (props, context) => {
        const route = useRoute()
        const router = useRouter()
        const formData = reactive<Partial<Tag>>({
            id: undefined,
            name: "",
            sign: "",
            kind: route.query.kind,
        })
        const errors = reactive({})
        const onError = (error: any) => {
            if (error.response.data.errors === "422") {
                Object.assign(errors, error.response.data.errors)
            }
            throw error
        }
        onMounted(async () => {
            if (props.id) {
                const response = await http.get<Resource<Tag>>(`/api/v1/tags/${props.id}`, {
                    _mock: "tagShow"
                }
                )
                console.log(response)
                Object.assign(formData, response.data.resources)
            } else {
                return
            }
        })
        const onSubmit = async (e: Event) => {
            e.preventDefault()
            const rules: Rules<typeof formData> = [
                { key: "name", type: "required", message: "必填" },
                { key: "name", type: "pattern", regex: /^.{1,4}$/, message: "只能填1-4个字符" },
                { key: "sign", type: "required", message: "必填" }
            ]
            Object.assign(errors, {
                name: [],
                sign: []
            })
            Object.assign(errors, validate(formData, rules))
            if (!hasError(errors)) {
                const promise = await formData.id ?
                    await http.patch(`/api/v1/tags/${formData.id}`, formData,
                        { params: { _mock: "tagEdit" } }
                    ).catch(onError)
                    :
                    await http.post("/api/v1/tags", formData,
                        { params: { _mock: "tagCreate" } }).catch(onError)
                router.back()
            }
        }
        return () => (
            (
                <form class={s.form} onSubmit={onSubmit}>
                    <div class={s.formRow}>
                        <label class={s.formLabel}>
                            <span class={s.formItem_name}>标签名</span>
                            <div class={s.formItem_value}>
                                <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
                            </div>
                            <div class={s.formItem_errorHint}>
                                <span>{errors["name"] ? errors["name"][0] : "　"}</span>
                            </div>
                        </label>
                    </div>
                    <div class={s.formRow}>
                        <label class={s.formLabel}>
                            <span class={s.formItem_name}>符号 {formData.sign}</span>
                            <div class={s.formItem_errorHint}>
                                <span>{errors["sign"] ? errors["sign"][0] : "　"}</span>
                            </div>
                            <div class={s.formItem_value}>
                                <div class={[s.formItem, s.emojiList, s.error]}>
                                    <EmojiSelect v-model={formData.sign} />
                                </div>
                            </div>
                            <div class={s.formItem_errorHint}>

                            </div>
                        </label>
                    </div>
                    <p class={s.tips}>记账时长按标签即可进行编辑</p>
                    <div class={s.formRow}>
                        <div class={s.formItem_value}>
                            <Button type='submit' class={[s.formItem, s.button]}>确定</Button>
                        </div>
                    </div>
                </form>
            )
        )
    }
})