import { defineComponent, PropType } from 'vue';
import { FloatButton } from '../../shared/FloatButton';
import s from './ItemSummary.module.scss'
import { ItemComponent } from './ItemComponent';
import { Form } from '../../shared/Form';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,

    },
    endDate: {
      type: String as PropType<string>,

    }
  },
  setup: (props, context) => {
    return () => (
      <>
        <div class={s.wrapper}>
          <div class={s.itemList}>
            <ItemComponent startDate={props.startDate} endDate={props.endDate} />
          </div>
          <Form />

        </div>
      </>
    )
  }
})