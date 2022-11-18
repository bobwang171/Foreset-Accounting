import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import s from './Charts.module.scss'
import { FormItem } from '../../shared/Form';

import * as echarts from 'echarts';
import { Icon } from '../../shared/icon';



export const Charts = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: true
        },
        endDate: {
            type: String as PropType<string>,
            required: true
        },
    },
    setup: (props, context) => {
        const lineChart = ref<HTMLDivElement>()
        const pieChart = ref<HTMLDivElement>()
        const kind = ref("expenses")
        const option = {
            grid: [{ top: 20, left: 40, bottom: 20 }],
            xAxis: {
                type: 'kind',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        };
        const option2 = {
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]



        }
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(pieChart.value);
            // 绘制图表
            myChart.setOption(option2);
        })

        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(lineChart.value);
            // 绘制图表
            myChart.setOption(option);
        })
        const barData = reactive([
            { tag: { id: 1, name: "房租", sign: "addTag" }, amount: 3000 },
            { tag: { id: 2, name: "吃饭", sign: "addTag" }, amount: 1000 },
            { tag: { id: 3, name: "娱乐", sign: "addTag" }, amount: 2000 }
        ])

        const BetterData = computed(() => {
            const total = barData.reduce((sum, item) => sum + item.amount, 0)
            return barData.map(item => ({
                ...item,
                percentage: Math.round(item.amount / total * 100) + "%"
            }))
        })
        return () => (
            <div class={s.wrapper}>
                <FormItem label='类型' type='select' options={[
                    { value: "expenses", text: "支出" },
                    { value: "income", text: "收入" }
                ]} v-model={kind.value} />

                <div class={s.lineChart} ref={lineChart}></div>
                <div class={s.pieChart} ref={pieChart}></div>
                <div class={s.barChart}>
                    {
                        BetterData.value.map(({ tag, amount, percentage }) => {
                            return (
                                <div class={s.wrapper}>

                                    <Icon name="addTag" class={s.icon} />

                                    <div class={s.body}>
                                        <div class={s.nameAndAmount}>
                                            <div class={s.name}>
                                                <span>{tag.name} - {percentage}</span>
                                            </div>
                                            <div class={s.amount}>{amount}</div>
                                        </div>
                                        <div class={s.bar}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
})