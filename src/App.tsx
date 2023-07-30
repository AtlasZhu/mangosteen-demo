import { defineComponent } from "vue";

export const App = defineComponent({
  setup() {
    return () => (
      <>
        <header>
          <ul>
            <li>
              <router-link to="/">Foo</router-link>
            </li>
            <li>
              <router-link to="/about">Bar</router-link>
            </li>
          </ul>
        </header>
        <main>
          <router-view />
        </main>
        <footer></footer>
      </>
    );
  },
});
