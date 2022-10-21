import s from "./WelcomeLayout.module.scss"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
export const Third = {
    render: () => (
        <WelcomeLayout>
            {{
                icon: () => <svg>
                    <use xlinkHref="#chart"></use>
                </svg>,
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

    