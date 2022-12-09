import { defineComponent, onMounted, PropType, ref, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Tabs, Tab } from '../../shared/Tabs';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
import { NumberPad } from '../../shared/NumberPad';
import dayjs from 'dayjs';
import { http } from '../../shared/Http';
import { RouterLink, useRouter } from 'vue-router';
import { Icon } from '../../shared/icon';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    const formData = reactive<Partial<Item>>({
      kind: "expenses",
      tag_ids: [],
      amount: 0,
      happen_at: dayjs().format(),

    })
    const onSubmit = async () => {
      await http.post<Resource<Item>>("/api/v1/items", formData, { params: { _mock: "itemCreate", _autoLoading: true } })
      router.back()
    }
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <RouterLink to="/items" class={s.navIcon} >
          <Icon name='return' />
        </RouterLink>,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出" value='expenses'>
                <Tags kind="expenses" v-model:selected={formData.tag_ids[0]} />
              </Tab>
              <Tab name="收入" value='income'>
                <Tags kind="income" v-model:selected={formData.tag_ids[0]} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <NumberPad
                v-model:happen_at={formData.happen_at}
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
