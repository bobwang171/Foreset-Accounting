import { defineComponent, PropType } from 'vue';
import { Icon } from './icon';
import { useRoute, useRouter } from 'vue-router';
export const BackIcon = defineComponent({
    setup: (props, context) => {
        const route = useRoute()
        const router = useRouter()
        const onClick = () =>
            router.back()
        return () => (
            <Icon name="return" onClick={onClick} />
        )
    }
})