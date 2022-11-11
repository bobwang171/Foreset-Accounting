import { computed, defineComponent, PropType, ref } from 'vue';
import { EmojiSelect } from './EmojiSelect';
import s from '../components/Tags/Tag.module.scss';
import { DatetimePicker, Popup } from 'vant';
import dayjs from 'dayjs';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'select'>,
    },
    error: {
      type: String
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array as PropType<Array<{ value: string, text: string }>>
    },
    onClick: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)
            }
            placeholder={props.placeholder}
            onClick={props.onClick}
            class={[s.formItem, s.input, s.error]} />
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onModelValueUpdated={value => {
              context.emit('update:modelValue', value)
            }

            }
            class={[s.formItem, s.emojiList, s.error]}
          />
        case 'date':
          return <><input readonly={true} value={props.modelValue} class={[s.formItem, s.emojiList, s.error, s.input]}
            onClick={() => { refDateVisible.value = true }}
            placeholder={props.placeholder} />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue} type="date" title="选择年月日" min-date={new Date(2020, 0, 1)} max-date={new Date(2030, 11, 31)}
                onConfirm={(date: Date) => {
                  context.emit("update:modelValue", dayjs(date).format("YYYY-MM-DD")),
                    refDateVisible.value = false
                }}
                onCancel={() => { refDateVisible.value = false }} />
            </Popup></>
        case 'select':
          return (
            <select value={props.modelValue} class={[s.formItem, s.input, s.select]}
              onChange={(e: any) => { context.emit("update:modelValue", e.target.value) }}>
              {props.options?.map((option) =>
                <option value={option.value}>
                  {option.text}</option>
              )}
            </select>
          )


        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {props.error &&
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div>
          }
        </label>
      </div>
    }
  }
})