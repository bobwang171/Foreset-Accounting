import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/Validate';
import s from './Tag.module.scss'
export const TagLayout = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            name: "",
            sign:""
        })
        const errors =reactive({})

        const onSubmit = (e: Event) => {
            e.preventDefault()
            const rules :Rules<typeof formData> = [
                { key: "name", type:"required", message: "必填" },
                { key: "name", type:"pattern",regex: /^.{1,4}$/, message: "只能填1-4个字符" },
                {key:"sign",type: "required",message:"必填"}
            ]
            Object.assign(errors, {
                name: undefined,
                sign:undefined
            })
            Object.assign(errors,validate(formData,rules))
            console.log(errors)
            
            
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
                            <span>{errors["name"]?errors["name"][0]:"　"}</span>
                        </div>
                    </label>
                </div>
                <div class={s.formRow}>
                    <label class={s.formLabel}>
                        <span class={s.formItem_name}>符号 {formData.sign}</span>
                        <div class={s.formItem_errorHint}>
                            <span>{errors["sign"]?errors["sign"][0]:"　"}</span>
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
                        <Button class={[s.formItem, s.button]}>确定</Button>
                    </div>
                </div>
            </form>
        )
    )
  }
})