import { defineComponent, onMounted, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
import { NumberPad } from '../../shared/NumberPad';
import dayjs from 'dayjs';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const refHappenAt = ref<string>(dayjs().format())
    const refAmount = ref<number>()
    const refTagID = ref<number>()
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <Icon name="return" class={s.navIcon} />,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出">
                <Tags kind="expenses" v-model:selected={refTagID.value} />
              </Tab>
              <Tab name="收入">
                <Tags kind="income" v-model:selected={refTagID.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <NumberPad
                v-model:happenAt={refHappenAt.value}
                v-model:amount={refAmount.value} />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
