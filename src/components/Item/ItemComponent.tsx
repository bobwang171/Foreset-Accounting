import { defineComponent, PropType } from 'vue';
import s from './ItemComponent.module.scss'
import { Icon } from '../../shared/icon';
import dayjs from 'dayjs';
export const ItemComponent = defineComponent({
  setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>
                <Icon name='addTag' class={s.icon}/>
                <div class={s.body}>
                    <div class={s.name}>事件名称</div>
                    <div class={s.date}>{dayjs().format("YYYY-MM-DD H:mm")}</div>
                </div>
                <div class={s.amount}>$ 200</div>
            </div>
            
    )
  }
})