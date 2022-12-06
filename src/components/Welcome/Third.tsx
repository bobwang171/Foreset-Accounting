import s from "./WelcomeLayout.module.scss"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
import { SkipFeature } from "../../shared/SkipFeature"
import { Icon } from "../../shared/icon"
export const Third = {
    render: () => (
        <WelcomeLayout>
            {{
                icon: () => <Icon name="statistics" class={s.icon3} />,
                title: () => <h2>数据可视化<br />收支一目了然</h2>,
                buttons: () => <>
                    <SkipFeature class={s.fake} />
                    <RouterLink to="/welcome/4">下一页</RouterLink>
                    <SkipFeature />
                </>
            }}
        </WelcomeLayout>

    )
}

