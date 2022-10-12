import { defineComponent, ref } from 'vue';

export const Bar = defineComponent({
    setup() {
        const refCount = ref(0)
        const onClick=() => {
            refCount.value+=1
        }
        return () => <>
            <div>
                {refCount.value}
            </div>
            <div>
                <button onClick={onClick}>Bar</button>
            </div>
        </>
    }
})