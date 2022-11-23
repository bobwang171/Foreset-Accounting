import { defineComponent, onMounted, ref, PropType } from 'vue';
import s from './ItemComponent.module.scss'
import { http } from '../../shared/Http';
export const ItemComponent = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)
    const fetchItems = async () => {
      const response = await http.get<Resources<Item>>('/api/v1/items', {
        created_after: props.startDate,
        created_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndex',
      })
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    onMounted(fetchItems)
    return () => (
      <div class={s.wrapper}>
        {items.value ? (
          <>
            <ol class={s.list}>
              {items.value.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.name}</span>
                      <span class={s.amount}>￥<>{item.amount}</></span>
                    </div>
                    <div class={s.time}>{item.happen_at}</div>
                  </div>
                </li>
              ))}
            </ol>

          </>
        ) : (<div>记录为空</div>)} </div>)
  }
})