import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { TagLayout } from './TagLayout';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { Dialog } from 'vant';
import { BackIcon } from '../../shared/BackIcon';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const numberId = parseInt(route.params.id.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    const onDelete = async (option?: { with_items: boolean }) => {
      await Dialog.confirm({
        title: "确认",
        message: "对应记账也会被删除，你真的要删除吗？"
      })
      await http.delete(`/api/v1/tags/${numberId}`,
        { withItem: option?.with_items ? "true" : "false" }).catch()
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () =>
            <>
              <TagLayout id={numberId} />
              <div class={s.actions}>
                <Button level='danger' class={s.removeTagAndItem} onClick={() => onDelete({ with_items: true })}>删除标签</Button>
              </div>
            </>
        }}</MainLayout>
    )
  }
})