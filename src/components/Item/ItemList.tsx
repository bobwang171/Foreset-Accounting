import { defineComponent, PropType, ref, reactive, watchEffect } from 'vue';
import s from './ItemList.module.scss'
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { ItemSummary } from './ItemSummary';
import dayjs from 'dayjs';
import { Overlay } from 'vant';
import { Form, FormItem } from '../../shared/Form';
import { OverlayIcon } from '../../shared/Overlay';


export const ItemList = defineComponent({

  setup: (props, context) => {
    const refOverlayVisible = ref(false);
    const refKind = ref("本月")
    const time = dayjs()
    const customTime = reactive([dayjs(), dayjs()])
    const onSubmitCustomTime = (e:Event) => {
      e.preventDefault()
      refOverlayVisible.value=false
    }
    const timeList = [
      [time.startOf("month"), time.endOf("month")],
      [time.subtract(1, "month").startOf("month"), time.subtract(1, "month").endOf("month")],
      [time.startOf("year"), time.endOf("year")]
      
      
    ]
    watchEffect(() => {
      if (refKind.value === "自定义") {
        refOverlayVisible.value=true
      }
    })
    
    return () => (
        <MainLayout>
          {
            {
              title: () => "山竹记账",
              icon: () => <OverlayIcon/>,
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
                    <ItemSummary startDate={timeList[2][0].format()} endDate={timeList[2][1].format()} />
                      <Overlay show={refOverlayVisible.value} >
                        <div class={s.wrapper}>
                        <div class={s.block}>
                          <header><span>请选择时间</span></header>
                          <Form onSubmit={onSubmitCustomTime}>
                              <FormItem type='date' label='起始时间' v-model={customTime[0]} />

                              <FormItem type='date' label='终止时间' v-model={customTime[1]} />

                              <div class={s.button_wrapper}>
                              <button class={s.cancel} type="button" onClick={()=>{refOverlayVisible.value=false}}>取消</button>
                              <button class={s.confirm} type="submit">确定</button>
                            </div>
                            </Form>

                        </div>
                        </div>
                      </Overlay>
                    </Tab>
                  </Tabs>
              </>
            }
          }
        </MainLayout>
    )
  }
})