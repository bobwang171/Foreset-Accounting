import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';

export const App = defineComponent({
    setup() {
        return () => <>
            <header>导航
                <ul>
                    <li>
                        <router-link to="/"> Bar</router-link>
                    </li>
                    <li>
                    <router-link to ="/about"> Foo</router-link>
                    </li>
                </ul>
            </header>
            <div>
                <RouterView />
            </div>
            <footer>页脚</footer>
            
        </>
    }
})