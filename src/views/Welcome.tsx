import { FunctionalComponent, Transition, defineComponent } from "vue";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/pineapple.svg";
import { RouterView, onBeforeRouteUpdate } from "vue-router";
const pathMap: string[] = [
  "/welcome/1",
  "/welcome/2",
  "/welcome/3",
  "/welcome/4",
];
const transitionClasses = [
  {
    enterFromClass: s.slide_fade_reverse_enter_from,
    enterActiveClass: s.slide_fade_reverse_enter_active,
    leaveToClass: s.slide_fade_reverse_leave_to,
    leaveActiveClass: s.slide_fade_reverse_leave_active,
  },
  {
    enterFromClass: s.slide_fade_enter_from,
    enterActiveClass: s.slide_fade_enter_active,
    leaveToClass: s.slide_fade_leave_to,
    leaveActiveClass: s.slide_fade_leave_active,
  },
];
let indexOfTransitionClasses: number;
export const Welcome = defineComponent({
  setup() {
    onBeforeRouteUpdate((to, from) => {
      const toIndex = pathMap.indexOf(to.path);
      const fromIndex = pathMap.indexOf(from.path);
      if (toIndex > -1 && fromIndex > -1) {
        indexOfTransitionClasses = toIndex > fromIndex ? 1 : 0;
      }
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref={`#${logo}`}></use>
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {({ Component }: { Component: FunctionalComponent }) => (
              <Transition
                enterFromClass={
                  transitionClasses[indexOfTransitionClasses]?.enterFromClass
                }
                enterActiveClass={
                  transitionClasses[indexOfTransitionClasses]?.enterActiveClass
                }
                leaveToClass={
                  transitionClasses[indexOfTransitionClasses]?.leaveToClass
                }
                leaveActiveClass={
                  transitionClasses[indexOfTransitionClasses]?.leaveActiveClass
                }
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
