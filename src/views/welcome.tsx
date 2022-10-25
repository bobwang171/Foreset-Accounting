import { defineComponent } from "vue"
import { RouterView } from 'vue-router';
import s from "./Welcome.module.scss"

export const Welcome = defineComponent({
    setup:(props,context)=>{
        return () => <div class={s.wrapper}>

            <header>
                <svg>
                    <use xlinkHref="#mangosteen"></use>
                </svg>
                <h1>山竹记账</h1>
            </header>
            <main class={s.main}><RouterView/></main>
        

            </div>
        
    }
})