import { defineComponent } from "vue"
import s from "./First.module.scss"
import pig from "../../assets/icon/pig.svg"
import { RouterLink } from "vue-router"
import {WelcomeLayout} from"./WelcomeLayout"
export const First = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout>
                {{
                    icon: () => <img src={pig} />,
                    title: () => <h2>会挣钱<br />还会省钱</h2>,
                    buttons: () => <>
                        <RouterLink to="/start" class={s.fake}>跳过</RouterLink>
                        <RouterLink to="/welcome/2">下一页</RouterLink>
                        <RouterLink to="/start">跳过</RouterLink></>

                }}
            </WelcomeLayout>
        )
    }
    })