import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss'
export type IconName = "add" | "chart" | "clock" | "cloud" |
    "forest" | "pig" | "menu" | "classify" | "export" |
    "notice" | "statistics" | "return" | "notes" | 'meal' |
    'clothing' | 'living' | 'income' | 'salary' | 'saving' |
    'fund' | 'addTag' | "note" | "noItems" | "comingSoon" |
    'noData'
export const Icon = defineComponent({
    props: {
        name: {
            type: String as PropType<IconName>,
            required: true
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        }
    },
    setup: (props, context) => {
        return () => (
            <svg class={s.icon} onClick={props.onClick}>
                <use xlinkHref={"#" + props.name}></use>
            </svg>
        )
    }
})