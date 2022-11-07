import { defineComponent, PropType } from 'vue';
import { Dayjs } from 'dayjs';
export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required:true
        },
        endDate: {
            type: String as PropType<string>,
            required:true
        }
    },
  setup: (props, context) => {
    return () => (
      <div>{console.log()}</div>
    )
  }
})