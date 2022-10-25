import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{
        {
              title: () => "记一笔",
              icon: () => <Icon name='return' class={s.navIcon} />,
              default: () =>
                <>
                  
              </>
            }
          }</MainLayout>
    )
  }
})