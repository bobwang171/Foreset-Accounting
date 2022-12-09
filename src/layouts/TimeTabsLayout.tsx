import dayjs from 'dayjs';
import { Overlay } from 'vant';
import { defineComponent, PropType, reactive, ref, watch, watchEffect, defineAsyncComponent } from 'vue';
import s from './TimeTabsLayout.module.scss'
import { Form, FormItem } from '../shared/Form';
import { OverlayIcon } from '../shared/Overlay';
import { Tab, Tabs } from '../shared/Tabs';
import { MainLayout } from './MainLayout';

const demo = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,

        },
        endDate: {
            type: String as PropType<string>,

        }
    }
})

export const TimeTabsLayout = defineComponent({
    props: {
        component: {
            type: Object as PropType<typeof demo>,
            required: true
        },
        rerender: {
            type: Boolean,
            default: false
        }
    },
    setup: (props, context) => {
        const refOverlayVisible = ref(false);
        const refKind = ref("本月")
        const time = dayjs()
        const temptTime = reactive({
            start: dayjs().format("YYYY-MM-DD"),
            end: dayjs().format("YYYY-MM-DD")
        })
        const customTime = reactive<{
            start: string,
            end: string
        }>({
            start: undefined,
            end: undefined
        })

        const onSubmitCustomTime = (e: Event) => {
            e.preventDefault()
            Object.assign(customTime, temptTime)
            refOverlayVisible.value = false


        }
        const timeList = [
            [time.startOf("month"), time.endOf("month")],
            [time.subtract(1, "month").startOf("month"), time.subtract(1, "month").endOf("month")],
            [time.startOf("year"), time.endOf("year")]


        ]
        watchEffect(() => {
            if (refKind.value === "自定义") {
                refOverlayVisible.value = true
            }
        })

        return () => (
            <MainLayout>
                {
                    {
                        title: () => "森林记账",
                        icon: () => <OverlayIcon />,
                        default: () =>
                            <>
                                <Tabs v-model:selected={refKind.value} onUpdate:selected={() => refOverlayVisible.value = true}
                                    rerender={props.rerender}>
                                    <Tab name='本月' value='本月'>
                                        <props.component
                                            startDate={timeList[0][0].format()} endDate={timeList[0][1].format()} />
                                    </Tab>
                                    <Tab name='上月' value='上月'>
                                        <props.component
                                            startDate={timeList[1][0].format()} endDate={timeList[1][1].format()} />
                                    </Tab>
                                    <Tab name='今年' value='今年'>
                                        <props.component
                                            startDate={timeList[2][0].format()} endDate={timeList[2][1].format()} />
                                    </Tab>
                                    <Tab name='自定义' value='自定义' >
                                        <props.component
                                            startDate={customTime.start}
                                            endDate={customTime.end} />
                                        <Overlay show={refOverlayVisible.value} class={s.overlay}>
                                            <div class={s.wrapper}>
                                                <div class={s.block}>
                                                    <header><span>请选择时间</span></header>
                                                    <Form onSubmit={onSubmitCustomTime}>
                                                        <FormItem type='date' label='起始时间' v-model={temptTime.start} />

                                                        <FormItem type='date' label='终止时间' v-model={temptTime.end} />

                                                        <div class={s.button_wrapper}>
                                                            <button class={s.cancel} type="button" onClick={() => { refOverlayVisible.value = false }}>取消</button>
                                                            <button class={s.confirm} type="submit" onClick={onSubmitCustomTime}>确定</button>
                                                        </div>
                                                    </Form>

                                                </div>
                                            </div>
                                        </Overlay>
                                    </Tab>
                                </Tabs>
                            </>
                    }
                }
            </MainLayout>
        )
    }
})