import { defineComponent, PropType } from 'vue';
import { emojiList } from './EmojiList';
import s from './EmojiSelect.module.scss'
export const EmojiSelect = defineComponent({
  setup: (props, context) => {
    const table: [string, string[]][] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['运动', ['sport', 'game']],
    ]
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
          {table[0].map((category) => {
            const emojis = emojiList.find(array =>  array[0] === category )
            console.log(emojis)
          })
}
          <li></li>
          </ol>  
      </div>
    )
  }
})