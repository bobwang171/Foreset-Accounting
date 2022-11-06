import { defineComponent} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { TagLayout } from './TagLayout';
export const TagCreate = defineComponent({
    setup: (props, context) => {
        return () => 
            <MainLayout>
                {{
                    title: () => '新建标签',
                    icon: () => <Icon name="return"/>,
                    default: () =><TagLayout/>
                }}
            </MainLayout>
              }
            })