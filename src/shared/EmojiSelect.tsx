import { defineComponent, PropType } from 'vue';
import { emojiList } from './EmojiList';
import s from './EmojiSelect.module.scss'
export const EmojiSelect = defineComponent({
  setup: (props, context) => {
    const table = [['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
      'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
      'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
    ]]
    return () => (
      
      <div class={s.emojiList}>
        <nav>
          <span class={s.selected}>表情</span>
          <span>手势</span>
          <span>职业</span>
          <span>衣服</span>
          <span>动物</span>
          <span>自然</span>
          <span>食物</span>
          <span>运动</span>
          <span>表情</span>
          <span>手势</span>
          <span>职业</span>
          <span>衣服</span>
          <span>动物</span>
          <span>自然</span>
          <span>食物</span>
          <span>运动</span>
        </nav>
        <ol>
          {table[0].map(category => {
            const emojis = emojiList.find((array) => array[0] === category)
            return (emojis [1] as Array<string>).map((emo) => <li>{emo}</li>)
          })}
          <li></li>
        </ol>
      </div>
    )
  }
})