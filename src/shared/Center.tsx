import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss'
export const Center = defineComponent({
    props: {
        direction: {

            type:String as PropType<"horizontal"| "vertical">
        }
        
    },
    setup: (props, context) => {
        const extraClass = props.direction === "horizontal" ?
            "horizontal":"vertical"
    return () => (
        <div class={[s.center,extraClass]}>
            {context.slots.default?.()}
      </div>
    )
  }
})