import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemCreate.module.scss'
import { NumberPad } from '../../shared/NumberPad';
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const refKind = ref("支出")
    const refExpenses = ref([
      { id: 1, name: "餐饮", sign: <Icon name='meal'/>, category: "expense" },
      { id: 2, name: "服装", sign: <Icon name='clothing'/>, category: "expense" },
      { id: 3, name: "水电煤", sign: <Icon name='living'/>, category: "expense" },
      { id: 4, name: "其他消费", sign: <Icon name='income'/>, category: "expense" },
    ])
    const refIncome = ref([
      { id: 1, name: "工资", sign: <Icon name='salary'/>, category: "income" },
      { id: 2, name: "储蓄", sign: <Icon name='saving'/>, category: "income" },
      { id: 3, name: "基金", sign: <Icon name='fund'/>, category: "income" },
      { id: 4, name: "其他收入", sign: <Icon name='income'/>, category: "income" },
    ])
    return () => (
      <MainLayout class={s.navbar}>{
        {
              title: () => "记一笔",
              icon: () => <Icon name='return' class={s.navIcon} />,
              default: () =><>
                <Tabs selected={refKind.value} onUpdateSelected={(name:string)=>refKind.value=name}>
                  <Tab name="支出" class={s.tab}>
                    {refExpenses.value.map((data) =>
                      <div class={s.content}>
                        <div class={s.sign_wrapper}>
                        <div class={s.sign}>{data.sign}</div>
                        </div>
                        <div class={s.name_wrapper}>
                        <div class={s.name}>{data.name}</div>
                        </div>
                      </div>
                    )
                    }
                  </Tab>
                  <Tab name="收入" class={s.tab}>
                    <div class={s.content}>
                      <div class={s.sign_wrapper}>
                        {refIncome.value.map((data) => <div class={s.sign}>{data.name}</div>)}
                      </div>
                      <div class={s.name}></div>
                      {refExpenses.value.map((data) => <div class={s.sign}>{data.sign}</div>)}
                      </div>
                  </Tab>
                </Tabs>
                <div class={s.numberPad_wrapper}>
                  <NumberPad></NumberPad>
                </div>
                </>
            }
          }</MainLayout>
    )
  }
})