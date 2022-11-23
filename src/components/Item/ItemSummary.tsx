import { defineComponent, PropType } from 'vue';
import { FloatButton } from '../../shared/FloatButton';
import s from './ItemSummary.module.scss'
import { ItemComponent } from './ItemComponent';
import { Form, FormItem } from '../../shared/Form';
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
          <ul class={s.itemBoard}>
            <li class={s.in}>
              <span>收入</span>
              <span>108</span>
            </li>
            <li class={s.out}>
              <span>支出</span>
              <span>102</span>
            </li>
            <li class={s.netIncome}>
              <span>净收入</span>
              <span>103</span>
            </li>
          </ul>
          <div class={s.itemList}>
            <ItemComponent startDate={props.startDate} endDate={props.endDate} />
          </div>
          <Form>
          </Form>
          <FloatButton iconName='add' />
        </div>
      </>
    )
  }
})