import { defineComponent } from "vue";
import s from "./WelcomeLayout.module.scss";
import chart from "../../assets/icons/chart.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const Three = defineComponent({
  setup() {
    const slots = {
      title: () => (
        <h2>
          数据可视化
          <br />
          收支一目了然
        </h2>
      ),
      icon: () => <img src={chart} alt="数据可视化"></img>,
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/four">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout v-slots={slots} />;
  },
});
