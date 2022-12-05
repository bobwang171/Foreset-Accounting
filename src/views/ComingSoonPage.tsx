import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { BackIcon } from '../shared/BackIcon';
import { Icon } from '../shared/icon';
import s from './ComingSoon.module.scss'
import { Center } from '../shared/Center';
export const ComingSoon = defineComponent({
    setup: (props, context) => {
        return () => (
            <MainLayout>
                {{
                    title: () => '山竹记账',
                    icon: () => <BackIcon />,
                    default: () =>
                        <>
                            <Center class={s.pig_wrapper}>
                                <Icon name="pig" class={s.pig} />
                            </Center>
                            <div class={s.text_wrapper}>
                                <span class={s.text}>敬请期待</span>
                            </div>
                        </>
                }}
            </MainLayout>
        )
    }
})