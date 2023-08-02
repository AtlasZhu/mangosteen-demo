import { FunctionalComponent } from "vue";
import s from "./WelcomeLayout.module.scss";

export const WelcomeLayout: FunctionalComponent = (attrs, { slots }) => (
  <div class={s.wrapper}>
    <div class={s.card}>
      {slots.icon?.()}
      {slots.title?.()}
    </div>
  </div>
);
