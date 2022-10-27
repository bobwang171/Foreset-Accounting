import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const refKind = ref("支出")
    return () => (
      <MainLayout class={s.navbar}>{
        {
              title: () => "记一笔",
              icon: () => <Icon name='return' class={s.navIcon} />,
              default: () =>
                <Tabs selected={refKind.value} onUpdateSelected={(name:string)=>refKind.value=name}>
                  <Tab name="支出">
                    Icon列表1
                  </Tab>
                  <Tab name="收入">
                  <div>Icon列表2</div> 
                  </Tab>
                </Tabs>
              
            }
          }</MainLayout>
    )
  }
})