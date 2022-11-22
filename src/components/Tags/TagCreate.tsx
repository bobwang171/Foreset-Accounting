import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { TagLayout } from './TagLayout';
export const TagCreate = defineComponent({
    setup: (props, context) => {
        return () =>
            <MainLayout>
                {{
                    title: () => '新建标签',
                    icon: () => <BackIcon />,
                    default: () => <TagLayout />
                }}
            </MainLayout>
    }
})