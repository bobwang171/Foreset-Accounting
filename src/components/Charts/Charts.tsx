import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './Charts.module.scss'
import { FormItem } from '../../shared/Form';

import * as echarts from 'echarts';



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
        const refDiv = ref<HTMLDivElement>(

        )
        const category = ref("expenses")
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(refDiv.value);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        })
        return () => (
            <div class={s.wrapper}>
                <FormItem label='类型' type='select' options={[
                    { value: "expenses", text: "支出" },
                    { value: "income", text: "收入" }
                ]} v-model={category.value} />

                <div class={s.demo} ref={refDiv}></div>
            </div>
        )
    }
})