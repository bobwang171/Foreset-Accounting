import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import s from './Charts.module.scss'
import { FormItem } from '../../shared/Form';
import * as echarts from 'echarts';
import { Icon } from '../../shared/icon';
import { getMoney } from '../../shared/Money';
import dayjs from 'dayjs';
import { http } from '../../shared/Http';
type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]

export const Charts = defineComponent({

    props: {
        startDate: {
            type: String as PropType<string>,

        },
        endDate: {
            type: String as PropType<string>,

        },
    },
    setup: (props, context) => {
        const lineChart = ref<HTMLDivElement>()
        const pieChart = ref<HTMLDivElement>()
        const kind = ref("expenses")

        const echartsOption = {
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: ([item]: any) => {
                    const [x, y] = item.data
                    return `${dayjs(x).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
                },
            },

            grid: [{ left: 20, top: 24, right: 20, bottom: 24 }],
            xAxis: {
                type: 'time',
                boundaryGap: ['3%', '0%'],
                axisLabel: {
                    formatter: (value: string) => dayjs(value).format('MM-DD'),
                },
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {
                show: true,
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                    },
                },
                axisLabel: {
                    show: false,
                },
            },
        };
        const pieOption = {
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
        const data1 = ref<Data1>([])
        const betterData1 = computed(() => {
            const array = []
            const dateGap = dayjs(props.endDate).diff(props.startDate, "day") + 1
            let data1Index = 0
            for (let i = 0; i < dateGap; i++) {
                const time = dayjs(props.startDate).add(i, "day").valueOf()
                if (data1.value[data1Index] && dayjs(data1.value[data1Index].happen_at).valueOf() === time) {
                    array.push([dayjs(time).toISOString(), data1.value[data1Index].amount])
                    data1Index += 1
                } else {
                    array.push([dayjs(time).toISOString(), 0])
                }

            }
            return array
        }
        )
        const refCharts = ref<echarts.ECharts>()
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            refCharts.value = echarts.init(pieChart.value);
            // 绘制图表
            refCharts.value.setOption(pieOption);
        })
        onMounted(async () => {
            const response = await http.get<{ groups: Data1, total: number }>('/api/v1/items/summary', {
                _mock: "itemSummary"
            })
            data1.value = response.data.groups

            // console.log(`response.date:${response.data}`)
        })
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            refCharts.value = echarts.init(lineChart.value);
            // 绘制图表
            refCharts.value.setOption({
                ...echartsOption,
                series: [{
                    data: betterData1.value,
                    type: 'line'
                }]
            });
        })
        watch(() => betterData1.value, () => {
            refCharts?.value?.setOption({
                series: [{
                    data: betterData1.value,
                    type: 'line'
                }],
            })
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