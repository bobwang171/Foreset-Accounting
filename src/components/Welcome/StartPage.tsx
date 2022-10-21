import { defineComponent } from 'vue';
import { Button } from '../../shared/Button';
import { FloatButton } from '../../shared/FloatButton';
import s from '../Welcome/StartPage.module.scss';
import { Center } from '../../shared/Center';
import { Icon} from '../../shared/icon';
import { NavBar } from '../../shared/NavBar';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const onClick = () => {
            console.log("hi")
        }
        return () => (
            <div>
                <NavBar>{
                    { default: "山竹记账", icon:<Icon name='menu'/>}
                }
                </NavBar>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>
           <div class={s.button_wrapper}>
            <div>
            <Button class={s.button} onClick={onClick}>开始记账</Button>
            </div>
            <FloatButton iconName="add"/>
          </div>
        </div>
    )
  }
})