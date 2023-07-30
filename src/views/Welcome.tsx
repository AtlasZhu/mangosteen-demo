import { defineComponent } from "vue";
import s from "./Welcome.module.scss";
export const Welcome = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <header>
          <div>logo</div>
          <h1>山竹记账</h1>
        </header>
        <main>
          <router-view></router-view>
        </main>
        <footer></footer>
      </div>
    );
  },
});
