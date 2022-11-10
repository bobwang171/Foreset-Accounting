import { defineComponent, PropType } from 'vue';
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
        return () => (
            <div>图表</div>
        )
    }
})