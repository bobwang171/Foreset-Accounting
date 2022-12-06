
import s from "./WelcomeLayout.module.scss"
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
import { SkipFeature } from '../../shared/SkipFeature';
import { Icon } from "../../shared/icon";
export const First = {
    render: () => (
        <WelcomeLayout>
            {{
                icon: () => <svg>
                    <use xlinkHref='#noItems'></use>
                </svg>
                ,
                title: () => <h2>会挣钱<br />还会省钱</h2>,
                buttons: () => <>
                    <SkipFeature class={s.fake} />
                    <RouterLink to="/welcome/2">下一页</RouterLink>
                    <SkipFeature /></>

            }}
        </WelcomeLayout>
    )
}