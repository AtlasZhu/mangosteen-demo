import { defineComponent } from "vue";
import s from "./NavBar.module.scss";

export const NavBar = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.navBar}>
        <div class={s.icon_wrapper}>{context.slots.icon?.()}</div>
        <div class={s.default_wrapper}>{context.slots.title?.()}</div>
      </div>
    );
  },
});
