import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './Overlay.module.scss'
import { Icon } from './icon';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { http } from './Http';
import { mePromise } from './me';
import { Dialog } from 'vant';
export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },


    setup: (props, context) => {
        const route = useRoute()
        const onSignOut = async () => {
            await Dialog.confirm({
                title: "确认",
                message: "确认要退出吗？"
            })
            localStorage.removeItem("jwt")
            location.reload()
        }
        const close = () => {
            props.onClose?.()
        }
        const me = ref<User>()
        onMounted(async () => {
            const response = await mePromise
            me.value = response.data.resource
        })

        return () => <>
            <div class={s.mask} onClick={close}></div>
            <div class={s.overlay}>


                {me.value ?
                    <section class={s.title}>
                        <h2 class={s.email}>{me.value.email}</h2>
                        <p onClick={onSignOut}>点击退出账号</p>
                    </section>
                    :
                    <RouterLink to={`/sign_in?return_to${route.fullPath}`}>
                        <section class={s.title}>
                            <h2>未登录用户</h2>
                            <p>点击这里登录</p>
                        </section>
                    </RouterLink>
                }



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