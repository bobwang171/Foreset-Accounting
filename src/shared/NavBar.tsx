import { defineComponent, PropType } from 'vue';
import s from './NavBar.module.scss'
export const NavBar = defineComponent({
    props: {
        type:String as PropType<string>
    },
    setup: (props, context) => {
      const {slots}=context
    return () => (
        <div class={s.navbar}>
            <span class={s.icon_wrapper}>
                    {slots.icon?.()}
            </span>
            <span class={s.title_wrapper}>
                {slots.default?.()}
            </span>
      </div>
    )
  }
})