import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { TagLayout } from './TagLayout';
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
                    default: () => <TagLayout/>
                }}</MainLayout>
                )
              }
            })