import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import s from './SignInPage.module.scss'
import { Icon } from '../shared/icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
import { validate } from '../shared/Validate';
export const SignIn = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            email: "",
            code: ""
        })
        const errors = reactive({
            email: "",
            code: ""
        })

        const onSubmit = (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })
            const newErrors = validate(formData, [{ key: "email", type: "required", message: "必填" },
            { key: "email", type: "pattern", regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "必须为邮箱地址" },
            { key: "code", type: "required", message: "必填" }])

            Object.assign(errors, newErrors)
        }
        const onClickSendCertificationCode = () => {
            console.log("11111")
        }
        return () => (
            <MainLayout>
                {{
                    title: () => "登录",
                    icon: () => <Icon name="return"></Icon>,
                    default: () => <>
                        <div class={s.wrapper}>
                            <div class={s.logo}><Icon name='mangosteen' /></div>
                            <Form class={s.form} onSubmit={onSubmit}>
                                <FormItem type='text' label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码' v-model={formData.email} error={errors.email?.[0] ?? "　"}></FormItem>
                                <div class={s.certificationCode_wrapper}>
                                    <FormItem class={s.certificationCode} type='text' label='验证码' placeholder='请输入六位数字' v-model={formData.code} error={errors.code?.[0] ?? "　"}></FormItem>
                                    <Button class={s.certificationButton} onClick={onClickSendCertificationCode}><span>发送验证码</span></Button>
                                </div>
                                <Button class={s.loginButton}>登录</Button>
                            </Form>
                        </div>
                    </>
                }}
            </MainLayout>
        )
    }
})