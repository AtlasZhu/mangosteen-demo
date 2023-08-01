import { defineComponent } from "vue";
import s from "./One.module.scss";
import chart from "../../assets/icons/chart.svg";
import { RouterLink } from "vue-router";

export const Three = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={chart} alt="数据可视化"></img>
          <h2>数据可视化</h2>
          <h2>收支一目了然</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/four">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});
