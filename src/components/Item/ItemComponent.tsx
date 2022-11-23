import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import s from './ItemComponent.module.scss'
import dayjs, { Dayjs } from 'dayjs';
import { http } from '../../shared/Http';
export const ItemComponent = defineComponent({
  props: {
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
  },
  setup: (props, context) => {
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)
    const fetchItems = async () => {
      const response = await http.get<Resources<Item>>('/api/v1/items', {
        happen_after: props.startDate,
        happen_before: props.endDate,
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
        {
          items.value.map((item) =>
            <>
              <li>
                <div class={s.icon} ><span>{item.tag_ids[0]}</span></div>
                <div class={s.body}>
                  <div class={s.name}>{item.id[0]}</div>
                  <div class={s.date}>{item.happen_at}</div>
                  <div class={s.amount}>{`￥${item.amount}`}</div>
                </div>
              </li>
            </>



          )}
      </div>

    )
  }
})