import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import s from './Charts.module.scss'
import { FormItem } from '../../shared/Form';
import * as echarts from 'echarts';
import { Icon } from '../../shared/icon';
import { getMoney, Money } from '../../shared/Money';
import dayjs from 'dayjs';
import { http } from '../../shared/Http';
import { Center } from '../../shared/Center';
type Data1Item = { happen_at: string, amount: number }
type Data2Item = { tag_id: number, tag: Tag, amount: number }
type Data1 = Data1Item[]
type Data2 = Data2Item[]

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

        const lineChartOption = {
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
            tooltip: {
                trigger: "item",
                formatter: ({ name, value, percent }: { name: string, value: number, percent: number }) => {
                    return `${name}  ￥${getMoney(value)}  (${percent}%)`
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '70%',
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
        const data2 = ref<Data2>([])
        const betterData1 = computed(() => {
            const array = []
            const dateGap = dayjs(props.endDate).diff(props.startDate, "day") + 1
            let data1Index = 0
            for (let i = 0; i < dateGap; i++) {
                const time = dayjs(props.startDate).add(i, "day").valueOf()
                if (data1.value[data1Index] && dayjs(data1.value[data1Index].happen_at + "T00:00:00.000+0800").valueOf() === time) {
                    array.push([dayjs(time).toISOString(), data1.value[data1Index].amount])
                    data1Index += 1
                } else {
                    array.push([dayjs(time).toISOString(), 0])
                }

            }
            return array
        }
        )
        let lineCharts: echarts.ECharts | undefined = undefined   //为了保证Echarts的tooltips正常显示，这里把ref改为let
        const refPieCharts = ref<echarts.ECharts>()



        const betterData = computed(() => {
            const total = barData.value.reduce((sum, item) => sum + item.amount, 0)
            return barData.value.map(item => ({
                ...item,
                percent: Math.round(item.amount / total * 100)
            }))
        })
        const betterData2 = computed<{ name: string, value: number }[]>(() =>
            data2.value.map(item => ({
                name: item.tag.name,
                value: item.amount
            }))
        )
        const fetchData1 = async () => {
            const response = await http.get<{ groups: Data1, total: number }>('/api/v1/items/summary', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                group_by: "happen_at",
                kind: kind.value,
                _mock: "itemSummary",
                _autoLoading: true
            })
            data1.value = response.data.groups
        }
        const fetchData2 = async () => {
            const response = await http.get<{ groups: Data2, total: number }>("/api/v1/items/summary", {
                happen_after: props.startDate,
                happen_before: props.endDate,
                group_by: "tag_id",
                kind: kind.value,
                _mock: "itemSummary",
                _autoLoading: true
            })
            data2.value = response.data.groups
        }
        const fetchData3 = async () => {
            const response = await http.get<{ groups: Data2, total: number }>("/api/v1/items/summary", {
                happen_after: props.startDate,
                happen_before: props.endDate,
                group_by: "tag_id",
                kind: kind.value,
                _mock: "itemSummary",
                _autoLoading: true
            })
            barData.value = response.data.groups
        }
        onMounted(fetchData3)
        watch(
            () => kind.value,
            () => fetchData3()
        )
        onMounted(fetchData1)
        watch(
            () => kind.value,
            () => fetchData1()
        )
        onMounted(fetchData2)
        watch(
            () => kind.value,
            () => fetchData2()
        )
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            refPieCharts.value = echarts.init(pieChart.value);
            // 绘制图表
            refPieCharts.value.setOption(pieOption);
        })
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            lineCharts = echarts.init(lineChart.value);
            // 绘制图表
            lineCharts.setOption(lineChartOption);
        })
        watch(() => betterData1.value, () => {
            lineCharts.setOption({
                series: [{
                    data: betterData1.value,
                    type: 'line'
                }],
            })
        })
        watch(() => betterData2.value, () => {
            refPieCharts.value.setOption({
                series: [{
                    data: betterData2.value,
                    type: "pie"
                }]
            })
        })


        const barData = ref<Data2>([])


        return () => (
            <div class={s.wrapper}>
                <FormItem label='类型' type='select' options={[
                    { value: "expenses", text: "支出" },
                    { value: "income", text: "收入" }
                ]} v-model={kind.value} />
                <div class={barData.value.length === 0 ? s.mask : ""}>
                    <Center class={s.noData_wrapper}>
                        <Icon name="noData" class={s.noData} />
                    </Center>
                    <div class={s.tips_wrapper}>
                        <span class={s.tips}>暂无数据</span>
                    </div>
                </div>
                <div class={s.lineChart} ref={lineChart}></div>

                <div class={s.pieChart} ref={pieChart}></div>
                <div class={s.barChart}>
                    {
                        betterData.value.map(({ tag, amount, percent }) => {
                            return (
                                <div class={s.wrapper}>

                                    <Icon name="addTag" class={s.icon} />

                                    <div class={s.body}>
                                        <div class={s.nameAndAmount}>
                                            <div class={s.name}>
                                                <span>{tag.name} - {percent}%</span>
                                            </div>
                                            <span class={s.amount}>
                                                <Money value={amount}></Money>
                                            </span>
                                        </div>

                                        <div class={s.bar}>
                                            <div class={s.bar_inner} style={{ width: `${percent}%` }}></div>
                                        </div>

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