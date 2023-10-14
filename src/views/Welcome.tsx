import { defineComponent, FunctionalComponent, ref, Transition, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import logo from "../assets/icons/pineapple.svg";
import { WelcomeNextPageButton } from "../components/welcome/WelcomeNextPageButton";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";
import s from "./Welcome.module.scss";

const pathMap: string[] = ["/welcome/1", "/welcome/2", "/welcome/3", "/welcome/4"];
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

const getNextPageUrl = function (urlNow: string) {
  const indexOfNextPage = pathMap.indexOf(urlNow) + 1;
  if (indexOfNextPage === pathMap.length) return "/items";
  return pathMap[indexOfNextPage];
};
const getLastPageUrl = function (urlNow: string) {
  const indexOfLastPage = pathMap.indexOf(urlNow) - 1;
  return pathMap[indexOfLastPage];
};

let nextPageUrl = ref<string>("/items");

export const Welcome = defineComponent({
  beforeRouteEnter(to) {
    nextPageUrl.value = getNextPageUrl(to.path);
  },
  beforeRouteUpdate(to, from) {
    const toIndex = pathMap.indexOf(to.path);
    const fromIndex = pathMap.indexOf(from.path);
    if (toIndex > -1 && fromIndex > -1) {
      indexOfTransitionClasses = toIndex > fromIndex ? 1 : 0;
    }
    nextPageUrl.value = getNextPageUrl(to.path);
  },

  setup() {
    const refOfWelcomeItem = ref<HTMLElement>();
    const { swiping, direction } = useSwipe(refOfWelcomeItem, {
      beforeStart: e => e.preventDefault(),
    });
    const route = useRoute();
    const router = useRouter();
    const toNextOrLastPage = throttle(() => {
      if (swiping.value && direction.value === "left") {
        router.push(getNextPageUrl(route.path));
      } else if (swiping.value && direction.value === "right") {
        if (route.path !== "/welcome/1") {
          router.push(getLastPageUrl(route.path));
        }
      }
    }, 350);
    watch([direction], toNextOrLastPage);

    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref={`#${logo}`}></use>
          </svg>
          <h1>菠萝账本</h1>
        </header>
        <main ref={refOfWelcomeItem}>
          <RouterView>
            {({ Component }: { Component: FunctionalComponent }) => (
              <Transition
                enterFromClass={transitionClasses[indexOfTransitionClasses]?.enterFromClass}
                enterActiveClass={transitionClasses[indexOfTransitionClasses]?.enterActiveClass}
                leaveToClass={transitionClasses[indexOfTransitionClasses]?.leaveToClass}
                leaveActiveClass={transitionClasses[indexOfTransitionClasses]?.leaveActiveClass}>
                <Component />
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <WelcomeNextPageButton nextPageUrl={nextPageUrl.value} />
        </footer>
      </div>
    );
  },
});

export default Welcome;
