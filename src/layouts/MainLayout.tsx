import { defineComponent } from "vue";
import { NavBar } from "../shared/NavBar";

export const MainLayout = defineComponent({
  setup(props, context) {
    return () => (
      <>
        <NavBar>
          {{
            icon: (cls: string) => context.slots.icon?.(cls),
            title: () => context.slots.title?.(),
          }}
        </NavBar>
        {context.slots.content?.()}
      </>
    );
  },
});
