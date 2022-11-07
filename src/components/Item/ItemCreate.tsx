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
      { id: 1, name: "餐饮", sign: <Icon name='meal' />, category: "expense" },
      { id: 2, name: "服装", sign: <Icon name='clothing' />, category: "expense" },
      { id: 3, name: "水电", sign: <Icon name='living' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },

      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "expense" },


    ])
    const refIncome = ref([
      { id: 1, name: "工资", sign: <Icon name='salary' />, category: "income" },
      { id: 2, name: "储蓄", sign: <Icon name='saving' />, category: "income" },
      { id: 3, name: "基金", sign: <Icon name='fund' />, category: "income" },
      { id: 4, name: "其他", sign: <Icon name='income' />, category: "income" },
    ])
    return () => (
      <MainLayout class={s.wrapper}>{
        {
          title: () => "记一笔",
          icon: () => <Icon name='return' class={s.navIcon} />,
          default: () => <>
              <Tabs class={s['tabs-wrapper']} selected={refKind.value} onUpdateSelected={(name: string) => refKind.value = name}>
                <Tab name="支出" class={s.tab}>
                  <div class={s.content}>
                    <div class={s.sign_wrapper}>
                      <div class={s.sign}><Icon name='addTag' /></div>
                    </div>
                    <div class={s.name}>新增 </div>
                  </div>

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
                  {refIncome.value.map((data) =>
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
              </Tabs>
              <NumberPad class={s.numberPad_wrapper}></NumberPad>
          </>
        }
      }</MainLayout>
    )

  }
})
