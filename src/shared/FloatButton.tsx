import { defineComponent } from 'vue';
import { Icon } from './icon';
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
            <Icon class={s.icon} name="add"/>
      </div>
    )
  }
})