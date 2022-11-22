import { defineComponent, onMounted, PropType, ref, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
import { NumberPad } from '../../shared/NumberPad';
import dayjs from 'dayjs';
import { http } from '../../shared/Http';
import { BackIcon } from '../../shared/BackIcon';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      kind: "支出",
      tags_id: [],
      amount: 0,
      happenAt: dayjs().format(),

    })
    const onSubmit = async () => {
      const response = await http.post<Resource<Item>>("/api/v1/items", formData, { params: { _mock: "itemCreate" } })
      console.log(response.data)
    }

    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <BackIcon class={s.navIcon} />,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出">
                <Tags kind="expenses" v-model:selected={formData.tags_id} />
              </Tab>
              <Tab name="收入">
                <Tags kind="income" v-model:selected={formData.tags_id} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <NumberPad
                v-model:happenAt={formData.happenAt}
                v-model:amount={formData.amount}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
