import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import s from './SignInPage.module.scss'
import { Icon } from '../shared/icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
export const SignIn = defineComponent({
  setup: (props, context) => {
        return () => (
            <MainLayout>
                {{
                    title: ()=>"登录",
                    icon: () => <Icon name="return"></Icon>,
                    default: () => <>
                        <div class={s.wrapper}>
                            <div class={s.logo}><Icon name='mangosteen'/></div>
                            <Form class={s.form}>
                                <FormItem type='text' label='邮箱地址'></FormItem>
                                <div class={s.certificationCode_wrapper}>
                                    <FormItem class={s.certificationCode} type='text' label='验证码'></FormItem>
                                    <Button class={s.certificationButton}><span>发送验证码</span></Button>
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