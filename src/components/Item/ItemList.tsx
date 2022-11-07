import { defineComponent, PropType, ref, reactive } from 'vue';
import s from './ItemList.module.scss'
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { ItemSummary } from './ItemSummary';
import dayjs from 'dayjs';


export const ItemList = defineComponent({

  setup: (props, context) => {
    
    const refKind = ref("本月")
    const time = dayjs()
    const custom=reactive([dayjs(),dayjs()])
    const timeList = [
      [time.startOf("month"), time.endOf("month")],
      [time.subtract(1, "month").startOf("month"), time.subtract(1, "month").endOf("month")],
      [time.startOf("year"), time.endOf("year")]
      
      
    ]
    
    return () => (
        <MainLayout>
          {
            {
              title: () => "山竹记账",
              icon: () => <Icon name='menu' class={s.navIcon} />,
              default: () =>
                <>
                  <Tabs selected={refKind.value} onUpdateSelected={(name: string) => refKind.value = name}>
                    <Tab name='本月'>
                      <ItemSummary startDate={timeList[0][0].format()} endDate={timeList[0][1].format()} />
                    </Tab>
                    <Tab name='上月'>
                      <ItemSummary startDate={timeList[1][0].format()} endDate={timeList[1][1].format()} />
                    </Tab>
                    <Tab name='今年'>
                      <ItemSummary startDate={timeList[2][0].format()} endDate={timeList[2][1].format()} />
                    </Tab>
                    <Tab name='自定义'>
                      <ItemSummary startDate={custom[0].format()} endDate={custom[1].format()}></ItemSummary>
                    </Tab>
                  </Tabs>
              </>
            }
          }
        </MainLayout>
    )
  }
})