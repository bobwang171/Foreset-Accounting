import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss'
export const Tabs = defineComponent({

  props: {
    selected: {
      type: String as PropType<string>
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>
    }
  },


  setup: (props, context) => {
    return () => {
      const array = context.slots.default?.()
      if (!array) return () => null
      for (let i = 0; i < array.length; i++) {
        if (array[i].type !== Tab)
          throw new Error("<Tabs> only accept <Tab> as children")
      }
      return <div>
        <ol class={s.tabs_nav}>
          {array.map(item =>
            <li class={item.props?.name === props.selected ? s.selected : ""}
              onClick={() => props.onUpdateSelected?.(item.props?.name)}
            >
              {item.props?.name}</li>)}
        </ol>
        {array.find((item) => item.props?.name === props.selected)}
      </div>
    }

  }

})


export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {

    return () => (
      <div>{context.slots.default?.()}

      </div>

    )
  }
})