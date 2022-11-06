import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { TagLayout } from './TagLayout';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss'
export const TagEdit = defineComponent({
  props: {
        name: {
            type: String as PropType<string>
        }
      },
    setup: (props, context) => {
        return () => (
            <MainLayout>
                {{
                    title: () => '新建标签',
                    icon: () => <Icon name="return" onClick={() => { }} />,
              default: () =>
                <>
                  <TagLayout />
                  <div class={s.actions}>
                  <Button  level="danger" class={s.removeTag} onClick={()=>{}}>删除标签</Button>
                    <Button level='danger' class={s.removeTagAndItem}>删除标签和记账</Button>
                  </div>
                </>
                }}</MainLayout>
                )
              }
            })