import { defineComponent, PropType, ref } from 'vue';
import s from './Overlay.module.scss'
import { Icon } from './icon';
export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },


    setup: (props, context) => {
        const close = () => {
            props.onClose?.()
        }
        
        return () => <>
        <div class={s.mask} onClick={close}></div>
          <div class={s.overlay}>
            <section class={s.title}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
            </section>
            <nav class={s.main}>
                <ul >
                    <li>
                        <Icon name='statistics'></Icon>
                        <span>统计图表</span>
                    </li>
                    <li>
                        <Icon name='export'></Icon>
                        <span>导出数据</span>
                    </li>
                    <li>
                        <Icon name='classify'></Icon>
                        <span>自定义分类</span>
                    </li>
                    <li>
                        <Icon name='notice'></Icon>
                        <span>记账提醒</span>
                    </li>
                </ul>
            </nav>
            </div>
                
                </>
    
  }
})


export const OverlayIcon = defineComponent({
    setup: (props, context) => {
        const overlayVisible = ref(false)
        const onClickMenu = () => {
            overlayVisible.value = !overlayVisible.value
        }
    return () => (
        <div>
            <>
                {overlayVisible.value &&
                    <Overlay onClose={() => overlayVisible.value = false} />}
                <Icon name='menu' class={s.navIcon} onClick={onClickMenu} />
            </>
      </div>
    )
  }
})