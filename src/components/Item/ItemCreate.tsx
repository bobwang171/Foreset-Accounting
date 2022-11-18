import { defineComponent, PropType, ref, onMounted } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemCreate.module.scss'
import { NumberPad } from '../../shared/NumberPad';
import { http } from '../../shared/Http';
type Tag = {
  id: number,
  name: string,
  sign: any,
  kind: "income" | "expenses"

}
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const refKind = ref("支出")
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/api/v1/tags", {
        kind: "expenses",
        _mock: "tagIndex"
      })
      refExpenses.value = response.data.resources
    })

    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/api/v1/tags", {
        kind: "income",
        _mock: "tagIndex"
      })
      refIncome.value = response.data.resources
    })

    const refExpenses = ref<Tag[]>([])
    const refIncome = ref<Tag[]>([])
    return () => (
      <MainLayout class={s.wrapper}>{
        {
          title: () => "记一笔",
          icon: () => <Icon name='return' class={s.navIcon} />,
          default: () => <>
            <Tabs class={s.tabs_wrapper} selected={refKind.value} onUpdateSelected={(name: string) => refKind.value = name}>
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
