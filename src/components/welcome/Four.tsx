import { defineComponent } from "vue";
import s from "./One.module.scss";
import cloud from "../../assets/icons/cloud.svg";
import { RouterLink } from "vue-router";

export const Four = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={cloud} alt="云备份"></img>
          <h2>云备份</h2>
          <h2>再也不怕数据丢失</h2>
        </div>
        <div class={s.actions}>
          <RouterLink to="/start">开启应用</RouterLink>
        </div>
      </div>
    );
  },
});
