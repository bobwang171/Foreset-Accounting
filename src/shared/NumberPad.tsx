import { defineComponent, PropType,ref } from 'vue';
import { Icon, IconName } from './icon';
import { DatetimePicker, Popup } from 'vant'
import s from './NumberPad.module.scss'
import dayjs from 'dayjs';
export const NumberPad = defineComponent({
    setup: (props, context) => {
        const now = new Date()
        const refDate = ref<Date>(now) 
        const refAmount = ref("")
        const appendText=(n:string|number)=>refAmount.value+=n.toString()
        const minDate = new Date(2020, 0, 1)
        const maxDate = new Date(2030,11,31)
        
        const buttons = [
            { text: "1", onClick: () => {appendText(1)} },
            { text: "2", onClick: () => {appendText(2)} },
            { text: "3", onClick: () => {appendText(3)} },
            { text: "4", onClick: () => {appendText(4) } },
            { text: "5", onClick: () => {appendText(5)} },
            { text: "6", onClick: () => {appendText(6)} },
            { text: "7", onClick: () => {appendText(7)} },
            { text: "8", onClick: () => { appendText(8)} },
            { text: "9", onClick: () => {appendText(9)} },
            { text: ".", onClick: () => {appendText(".")} },
            { text: "0", onClick: () => { appendText(0) } },
            { text: "清空", onClick: () => {refAmount.value=""} },
            { text: "提交", onClick: () => { } },
            
        ]
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        return () => (
            <>
                <div class={s.dateAndAmount}>
                    <span class={s.date}>
                        <Icon name='notes' class={s.icon}></Icon>
                        <span>
                        <span onClick={showDatePicker}>{dayjs(refDate.value).format('YYYY/MM/DD')}</span>
                            <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                                <DatetimePicker value={refDate.value} type="date" title="选择年月日" min-date={minDate} max-date={maxDate}
                                    onConfirm={setDate} onCancel={hideDatePicker} />
                            </Popup>
                        </span>
                    </span>
                    <span class={s.amount}>{refAmount.value}</span>  
                </div>

                <div class={s.buttons}>
                {buttons.map(button=>
                    <button onClick={button.onClick}>{button.text}
                    </button>)}

                </div>
        </>
    )
  }
})