import { defineComponent, PropType } from 'vue';
import s from './ItemList.module.scss'
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    
    return () => (
        <MainLayout>
          {
            {
              title: () => "记一笔",
              icon: () => <Icon name='return' class={s.navIcon} />,
              default: () =>
                <>
                  
              </>
            }
          }
        </MainLayout>
    )
  }
})