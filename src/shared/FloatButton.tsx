import { defineComponent, PropType } from 'vue';
import { Icon, IconName } from './icon';
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required:true
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
            <Icon class={s.icon} name={props.iconName}/>
      </div>
    )
  }
})