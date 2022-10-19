import { defineComponent } from "vue"
import s from "./First.module.scss"
import chart from "../../assets/icon/chart.svg"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
export const Third = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout>
                {{
                    icon: () => <img class={s.chart} src={chart} />,
                    title: () => <h2>每日提醒<br />不遗漏每一笔账单</h2>,
                    buttons: () => <>
                        <RouterLink to="/start" class={s.fake}>跳过</RouterLink>
                        <RouterLink to="/welcome/4">下一页</RouterLink>
                        <RouterLink to="/start">跳过</RouterLink>
                    </>
                }}
            </WelcomeLayout>
            
        )
    }
})
    