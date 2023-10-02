import { defineComponent } from "vue";
import { NavBar } from "../shared/NavBar";
import s from "./MainLayout.module.scss";
export const MainLayout = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <NavBar class={s.navBar}>
          {{
            icon: () => context.slots.icon?.(),
            title: () => context.slots.title?.(),
          }}
        </NavBar>
        {context.slots.content?.()}
      </div>
    );
  },
});
