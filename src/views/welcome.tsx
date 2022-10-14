import { defineComponent } from "vue"
import { RouterView } from 'vue-router';
import s from "./welcome.module.scss"
import logo from "../assets/icon/mangosteen.svg"

export const Welcome = defineComponent({
    setup:(props,context)=>{
        return () => <div class={s.wrapper}>

            <header>
                <img src={logo} />
                <h1>山竹记账</h1>
            </header>
            <main><RouterView/></main>
            <footer>buttons</footer>

            </div>
        
    }
})