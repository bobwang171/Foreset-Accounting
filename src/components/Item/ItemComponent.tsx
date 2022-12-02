import { defineComponent, onMounted, ref, PropType, reactive, watch } from 'vue';
import s from './ItemComponent.module.scss'
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import { Center } from '../../shared/Center';
import { Icon } from '../../shared/icon';
import { RouterLink } from 'vue-router';
import { Button } from '../../shared/Button';
import { FloatButton } from '../../shared/FloatButton';
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
        {items.value && items.value.length > 0 ? (
          <>
            <ul class={s.itemBoard}>
              <li class={s.in}>
                <span>收入</span>
                <Money value={itemBalance.income} />
              </li>
              <li class={s.out}>
                <span>支出</span>
                <Money value={itemBalance.expenses} />
              </li>
              <li class={s.netIncome}>
                <span>净收入</span>
                <Money value={itemBalance.balance} />
                {console.log(itemBalance.balance)}
              </li>
            </ul>
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
            <FloatButton iconName='add' />
          </>
        )
          : <>
            <Center class={s.pig_wrapper}>
              <Icon name="pig" class={s.pig} />
            </Center>
            <div class={s.button_wrapper}>

              <RouterLink to="/Item/create">
                <Button class={s.button} >开始记账</Button>
              </RouterLink>
            </div>
          </>
        }
      </div>)
  }
})