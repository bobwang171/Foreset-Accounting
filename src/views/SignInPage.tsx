import { computed, defineComponent, reactive, ref, PropType } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import s from './SignInPage.module.scss'
import { Icon } from '../shared/icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
import { validate, hasError } from '../shared/Validate';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../shared/Http';
import { refreshMe } from '../shared/me';
export const SignIn = defineComponent({
    props: {
        countFrom: {
            type: Number,
            default: 10
        }
    },
    setup: (props, context) => {
        const formData = reactive({
            email: "",
            code: ""
        })
        const errors = reactive({
            email: "",
            code: ""
        })
        const router = useRouter()
        const route = useRoute()

        const onSubmit = async (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })

            const newErrors = validate(formData, [{ key: "email", type: "required", message: "必填" },
            { key: "email", type: "pattern", regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "必须为邮箱地址" },
            { key: "code", type: "required", message: "必填" }])

            Object.assign(errors, newErrors)
            const onError = (error: any) => {
                if (error.response.data.errors === "422") {
                    Object.assign(errors, error.response.data.errors)
                }
                throw error
            }

            if (!hasError(newErrors)) {
                const response = await http.post<{ jwt: string }>("/api/v1/session", formData,
                    { params: { _mock: "session" } }).catch(onError)
                console.log(response)
                localStorage.setItem("jwt", response.data.jwt)

                const returnTo = route?.query?.return_to?.toString()
                refreshMe().then(() => {
                    if (returnTo) {
                        router.push(returnTo)
                    }
                    else {
                        router.push("/")
                    }
                },
                    () => {
                        window.alert("登录失败")
                    }
                )

            }
        }

        const onClickSendCertificationCode = async () => {
            const response = await http.post("/api/v1/validation_codes", { email: formData.email })

        }
        const timer = ref<number>()
        const count = ref<number>(props.countFrom)
        const isCounting = computed(() => !!timer.value)
        const onClickSendWithTimer = () => {
            onClickSendCertificationCode()
            timer.value = setInterval(() => {
                count.value -= 1
                if (count.value === 0) {
                    clearInterval(timer.value);
                    timer.value = undefined
                    count.value = props.countFrom
                }
            }, 1000)
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
                                    <Button disabled={isCounting.value} class={s.certificationButton} onClick={onClickSendWithTimer}>
                                        {isCounting.value ? `等待${count.value}秒后重置` : "点击获取验证码"}
                                    </Button>
                                </div>
                                <Button class={s.loginButton} onClick={onSubmit}>登录</Button>
                            </Form>
                        </div>
                    </>
                }}
            </MainLayout>
        )
    }
})