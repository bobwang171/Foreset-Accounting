import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { TagLayout } from './TagLayout';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss'
import { useRoute } from 'vue-router';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <Icon name="return" onClick={() => { }} />,
          default: () =>
            <>
              <TagLayout id={numberId} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTag} onClick={() => { }}>删除标签</Button>
                <Button level='danger' class={s.removeTagAndItem}>删除标签和记账</Button>
              </div>
            </>
        }}</MainLayout>
    )
  }
})