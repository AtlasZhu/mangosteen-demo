import { defineComponent } from "vue";
import s from "./One.module.scss";
import pig from "../../assets/icons/pig.svg";
import { RouterLink } from "vue-router";

export const One = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={pig} alt="会挣钱"></img>
          <h2>会挣钱</h2>
          <h2>还要会省钱</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/two">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});
