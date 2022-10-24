import { defineComponent, ref } from 'vue';
import { Button } from '../../shared/Button';
import { FloatButton } from '../../shared/FloatButton';
import s from '../Welcome/StartPage.module.scss';
import { Center } from '../../shared/Center';
import { Icon} from '../../shared/icon';
import { NavBar } from '../../shared/NavBar';
import { Overlay } from '../../shared/Overlay';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const overlayVisible=ref(false)
        const onClickMenu = () => {
            console.log("hi")
            overlayVisible.value=!overlayVisible.value
        }
        
        return () => (
            <div>
                <NavBar>{
                    {
                        default:()=>"山竹记账" ,
                        icon:()=><Icon name='menu' class={s.navIcon} onClick={onClickMenu} /> 
                    }
                }
                </NavBar>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>
           <div class={s.button_wrapper}>
            <div>
            <Button class={s.button} >开始记账</Button>
            </div>
                    <FloatButton iconName="add" />

                </div>
                {overlayVisible.value &&
                    <Overlay onClose={ ()=>overlayVisible.value=false} />} 
        </div>
    )
  }
})