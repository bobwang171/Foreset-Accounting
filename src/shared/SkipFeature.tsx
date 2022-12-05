import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
const onClick = () => {
    localStorage.setItem("skipFeature", "yes")
}

export const SkipFeature = defineComponent({
    setup: (props, context) => {
        return () => (
            <span onClick={onClick}>
                <RouterLink to="/Items">跳过</RouterLink>
            </span>
        )
    }
})