import { defineComponent, onMounted, ref, PropType, reactive, watch } from 'vue';
import s from './ItemComponent.module.scss'
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
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
      if (!props.startDate || !props.endDate) { return }
      const response = await http.get<Resources<Item>>('/api/v1/items', {
        created_after: props.startDate,
        created_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndex',
        _autoLoading: true
      })
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    onMounted(fetchItems)
    watch(() => [props.startDate, props.endDate], () => {
      items.value = [],
        hasMore.value = false,
        page.value = 0
      fetchItems()

    })

    const itemBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    })
    const fetchBalance = async () => {
      if (!props.startDate || !props.endDate) { return }
      const response = await http.get("/api/v1/items/balance", {
        created_after: props.startDate,
        created_before: props.endDate,
        page: page.value + 1,
        _mock: "itemIndexBalance"
      })
      Object.assign(itemBalance, response.data)
    }
    onMounted(fetchBalance)

    watch(() => [props.startDate, props.endDate], () => {
      Object.assign(itemBalance, {
        expenses: 0,
        income: 0,
        balance: 0
      })
      fetchBalance()
    })
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
                      <span class={s.amount}><Money value={item.amount} /></span>
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