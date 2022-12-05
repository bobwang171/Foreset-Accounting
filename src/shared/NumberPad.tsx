import { defineComponent, PropType, ref } from 'vue';
import { Icon } from './icon';
import { DatetimePicker, Popup } from 'vant'
import s from './NumberPad.module.scss'
import dayjs from 'dayjs';
export const NumberPad = defineComponent({
  props: {
    happen_at: {
      type: String
    },
    amount: {
      type: Number
    },
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : "0")
    const appendText = (n: string | number) => {
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf(".")
      if (nString === '.') {
        if (dotIndex >= 0) { // 已经有小数点了
          return
        }
      }
      else if (nString === "0") {
        if (refAmount.value === '0')
          return
      }
      else {
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }
      if (refAmount.value.length > 13) {
        return
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return
      }
      refAmount.value += n.toString()

    }
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2030, 11, 31)

    const buttons = [
      { text: "1", onClick: () => { appendText(1) } },
      { text: "2", onClick: () => { appendText(2) } },
      { text: "3", onClick: () => { appendText(3) } },
      { text: "4", onClick: () => { appendText(4) } },
      { text: "5", onClick: () => { appendText(5) } },
      { text: "6", onClick: () => { appendText(6) } },
      { text: "7", onClick: () => { appendText(7) } },
      { text: "8", onClick: () => { appendText(8) } },
      { text: "9", onClick: () => { appendText(9) } },
      { text: ".", onClick: () => { appendText(".") } },
      { text: "0", onClick: () => { appendText(0) } },
      { text: "清空", onClick: () => { refAmount.value = "" } },
      {
        text: "提交", onClick: () => {
          context.emit("update:amount", parseFloat(refAmount.value) * 100)
          props.onSubmit?.()
        }
      },

    ]
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const setDate = (date: Date) => {
      context.emit("update:happen_at", date.toISOString());
      hideDatePicker()
    }
    return () => (
      <>
        <div class={s.numberPad}>
          <div class={s.dateAndAmount}>
            <div class={s.date}>
              <Icon name='notes' class={s.icon}></Icon>
              <span>
                <span onClick={showDatePicker}>{dayjs(props.happen_at).format('YYYY/MM/DD')}</span>
                <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                  <DatetimePicker modelValue={new Date(props.happen_at)} type="date" title="选择年月日" min-date={minDate} max-date={maxDate}
                    onConfirm={setDate} onCancel={hideDatePicker} />
                </Popup>
              </span>
            </div>
            <span class={s.amount}>{refAmount.value}</span>
          </div>

          <div class={s.buttons}>
            {buttons.map(button =>
              <button onClick={button.onClick}>{button.text}
              </button>)}

          </div>
        </div>
      </>
    )
  }
})