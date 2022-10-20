import { defineComponent } from 'vue';
import { Icon } from './icon';
export const FloatButton = defineComponent({
  setup: (props, context) => {
    return () => (
        <div>
            <Icon name="clock"/>
      </div>
    )
  }
})