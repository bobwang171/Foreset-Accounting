import { defineComponent } from "vue"
import s from "./First.module.scss"
import clock from "../../assets/icon/clock.svg"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"

export const Second = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout>
                {{
                    icon:()=><img class={s.clock} src={clock} />,
                    title:()=><h2>每日提醒<br />不遗漏每一笔账单</h2>,
                    buttons: () => <>
                    <RouterLink to="/start" class={s.fake}>跳过</RouterLink>
                    <RouterLink to="/welcome/3">下一页</RouterLink>
                    <RouterLink to="/start">跳过</RouterLink></>
                
                }}
            </WelcomeLayout>
        )
    }
    })
            