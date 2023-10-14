import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from "./NotFound.module.scss";
export const NotFound = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <h1>404</h1>
        <h4>页面未找到</h4>
        <RouterLink to="/items">点击回到首页</RouterLink>
      </div>
    );
  },
});

export default NotFound;
