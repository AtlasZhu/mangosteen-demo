import { defineComponent } from "vue";
import s from "./NotFound.module.scss";
import { RouterLink } from "vue-router";
export const NotFound = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <h1>404</h1>
        <h4>页面未找到</h4>
        <RouterLink to="/start">点击回到首页</RouterLink>
      </div>
    );
  },
});
