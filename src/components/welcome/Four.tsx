import { defineComponent } from "vue";
import cloud from "../../assets/icons/cloud.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const Four = defineComponent({
  setup() {
    const slots = {
      title: () => (
        <h2>
          云备份
          <br />
          再也不怕数据丢失
        </h2>
      ),
      icon: () => <img src={cloud} alt="云备份"></img>,
      buttons: () => (
        <>
          <RouterLink to="/start">开启应用</RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout v-slots={slots} />;
  },
});
