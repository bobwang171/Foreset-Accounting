import { defineComponent, PropType } from 'vue';
import { Charts } from '../components/Charts/Charts';
import { TimeTabsLayout } from '../layouts/TimeTabsLayout';
export const Statistics = defineComponent({
    setup: (props, context) => {
        return () => (
            <TimeTabsLayout component={Charts} />
        )
    }
})