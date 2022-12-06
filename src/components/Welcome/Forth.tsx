import { defineComponent, render } from "vue"
import s from "./WelcomeLayout.module.scss"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
import { SkipFeature } from "../../shared/SkipFeature"

const onClick = () => {
    localStorage.setItem("skipFeature", "yes")
}

export const Forth = {
    render: () => (
        <WelcomeLayout>
            {{
                icon: () => <svg>
                    <use xlinkHref="#cloud"></use>
                </svg>,
                title: () => <h2>云备份<br />不怕数据丢失</h2>,
                buttons: () => <>
                    <SkipFeature class={s.fake} />
                    <span onClick={onClick}>
                        <RouterLink to="/sign_in?return_to=/items" >开始记账</RouterLink>
                    </span>
                    <SkipFeature class={s.fake} />
                </>
            }}
        </WelcomeLayout >
    )
}