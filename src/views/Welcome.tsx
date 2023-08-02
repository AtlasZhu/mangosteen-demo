import { Transition, defineComponent } from "vue";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/pineapple.svg";
import { RouterView, onBeforeRouteUpdate } from "vue-router";

export const Welcome = defineComponent({
  setup() {
    const pathMap: { [key: string]: number } = {
      "/welcome/1": 1,
      "/welcome/2": 2,
      "/welcome/3": 3,
      "/welcome/4": 4,
    };
    const getTransitionClasses = (order: number) => {
      if (order === 0) {
        return {
          enterFromClass: s.slide_fade_reverse_enter_from,
          enterActiveClass: s.slide_fade_reverse_enter_active,
          leaveToClass: s.slide_fade_reverse_leave_to,
          leaveActiveClass: s.slide_fade_reverse_leave_active,
        };
      } else {
        return {
          enterFromClass: s.slide_fade_enter_from,
          enterActiveClass: s.slide_fade_enter_active,
          leaveToClass: s.slide_fade_leave_to,
          leaveActiveClass: s.slide_fade_leave_active,
        };
      }
    };
    let transitionClasses: {
      enterFromClass: string;
      enterActiveClass: string;
      leaveToClass: string;
      leaveActiveClass: string;
    };
    onBeforeRouteUpdate((to, from) => {
      if (pathMap[to.path] && pathMap[from.path]) {
        transitionClasses =
          pathMap[to.path] > pathMap[from.path]
            ? getTransitionClasses(1)
            : getTransitionClasses(0);
      }
    });

    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} alt="logo" />
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {({ Component }: any) => (
              <Transition
                enterFromClass={transitionClasses?.enterFromClass}
                enterActiveClass={transitionClasses?.enterActiveClass}
                leaveToClass={transitionClasses?.leaveToClass}
                leaveActiveClass={transitionClasses?.leaveActiveClass}
              >
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
