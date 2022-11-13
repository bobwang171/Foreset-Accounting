import s from "./WelcomeLayout.module.scss"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
import { SkipFeature } from "../../shared/SkipFeature"
export const Third = {
    render: () => (
        <WelcomeLayout>
            {{
                icon: () => <svg>
                    <use xlinkHref="#chart"></use>
                </svg>,
                title: () => <h2>每日提醒<br />不遗漏每一笔账单</h2>,
                buttons: () => <>
                    <SkipFeature class={s.fake} />
                    <RouterLink to="/welcome/4">下一页</RouterLink>
                    <SkipFeature />
                </>
            }}
        </WelcomeLayout>

    )
}

