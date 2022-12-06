import { defineComponent } from "vue"
import { RouterView } from 'vue-router';
import s from "./Welcome.module.scss"
import { Icon } from '../shared/icon';

export const Welcome = defineComponent({
    setup: (props, context) => {
        return () => <div class={s.wrapper}>

            <header>
                <Icon name="forest" />
                <h1>森林记账</h1>
            </header>
            <main class={s.main}><RouterView /></main>


        </div>

    }
})