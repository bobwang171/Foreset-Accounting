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
                    title: () => '森林记账',
                    icon: () => <BackIcon />,
                    default: () =>
                        <>
                            <Center class={s.pig_wrapper}>
                                <Icon name="comingSoon" class={s.pig} />
                            </Center>
                            <div class={s.tips_wrapper}>
                                <span class={s.tips}>功能尚未开发，敬请期待哦~</span>
                            </div>
                        </>
                }}
            </MainLayout>
        )
    }
})