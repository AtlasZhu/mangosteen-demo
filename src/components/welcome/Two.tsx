import { defineComponent } from "vue";
import s from "./One.module.scss";
import clock from "../../assets/icons/clock.svg";
import { RouterLink } from "vue-router";

export const Two = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={clock} alt="每日提醒"></img>
          <h2>每日提醒</h2>
          <h2>不会遗漏每一笔账单</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/three">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});
