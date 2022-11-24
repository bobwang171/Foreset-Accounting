import { defineComponent, PropType } from 'vue';
export const Money = defineComponent({
    props: {
        value: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup: (props, context) => {
        return () => (
            <span>￥{((props.value) / 100).toFixed(2)}</span>
        )
    }
})