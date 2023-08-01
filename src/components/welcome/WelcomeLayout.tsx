import { defineComponent } from "vue";
import s from "./WelcomeLayout.module.scss";

export const WelcomeLayout = defineComponent({
  setup(attrs, { slots }) {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.icon && slots.icon()}
          {slots.title && slots.title()}
        </div>
        <div class={s.actions}>{slots.buttons && slots.buttons()}</div>
      </div>
    );
  },
});
