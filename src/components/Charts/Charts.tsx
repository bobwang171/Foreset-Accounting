import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import s from './Charts.module.scss'
import { FormItem } from '../../shared/Form';
import * as echarts from 'echarts';
import { Icon } from '../../shared/icon';
import { getMoney } from '../../shared/Money';
import dayjs from 'dayjs';



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
        const lineData = [
            ['2018-01-01T00:00:00.000+0800', 150],
            ['2018-01-02T00:00:00.000+0800', 230],
            ['2018-01-03T00:00:00.000+0800', 224],
            ['2018-01-04T00:00:00.000+0800', 218],
            ['2018-01-05T00:00:00.000+0800', 135],
            ['2018-01-06T00:00:00.000+0800', 147],
            ['2018-01-07T00:00:00.000+0800', 260],
            ['2018-01-08T00:00:00.000+0800', 300],
            ['2018-01-09T00:00:00.000+0800', 200],
            ['2018-01-10T00:00:00.000+0800', 300],
            ['2018-01-11T00:00:00.000+0800', 400],
            ['2018-01-12T00:00:00.000+0800', 500],
            ['2018-01-13T00:00:00.000+0800', 400],
            ['2018-01-14T00:00:00.000+0800', 300],
            ['2018-01-15T00:00:00.000+0800', 200],
            ['2018-01-16T00:00:00.000+0800', 100],
            ['2018-01-17T00:00:00.000+0800', 200],
            ['2018-01-18T00:00:00.000+0800', 300],
            ['2018-01-19T00:00:00.000+0800', 400],
            ['2018-01-20T00:00:00.000+0800', 500],
            ['2018-01-21T00:00:00.000+0800', 600],
            ['2018-01-22T00:00:00.000+0800', 700],
            ['2018-01-23T00:00:00.000+0800', 800],
            ['2018-01-24T00:00:00.000+0800', 900],
            ['2018-01-25T00:00:00.000+0800', 1000],
            ['2018-01-26T00:00:00.000+0800', 1100],
            ['2018-01-27T00:00:00.000+0800', 1200],
            ['2018-01-28T00:00:00.000+0800', 1300],
            ['2018-01-29T00:00:00.000+0800', 1400],
            ['2018-01-30T00:00:00.000+0800', 1500],
            ['2018-01-31T00:00:00.000+0800', 1600],
        ]
        const echartsOption = {
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: ([item]: any) => {
                    const [x, y] = item.data
                    return `${dayjs(x).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
                },
            },

            grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
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
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(pieChart.value);
            // 绘制图表
            myChart.setOption(pieOption);
        })
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(lineChart.value);
            // 绘制图表
            myChart.setOption({
                ...echartsOption,
                series: [{
                    data: lineData,
                    type: 'line'
                }]
            });
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