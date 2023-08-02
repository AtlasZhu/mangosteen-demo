import { Transition, defineComponent } from "vue";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/pineapple.svg";
import { RouterView } from "vue-router";
export const Welcome = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} alt="logo" />
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {({ Component, route }: any) => (
              <Transition name={route.meta.transition}>
                <Component />
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer"></RouterView>
        </footer>
      </div>
    );
  },
});
