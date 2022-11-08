import { defineComponent, PropType } from 'vue';
import { FloatButton } from '../../shared/FloatButton';
import s from './ItemSummary.module.scss'
import { ItemComponent } from './ItemComponent';
import { Form, FormItem } from '../../shared/Form';
export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required:true
        },
        endDate: {
            type: String as PropType<string>,
            required:true
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
            <ItemComponent />
            <ItemComponent />
            <ItemComponent />
          </div>
          <Form>
            <FormItem label='时间' type='date'></FormItem>
          </Form>
          <FloatButton iconName='add' />
        </div>
      </>
    )
  }
})