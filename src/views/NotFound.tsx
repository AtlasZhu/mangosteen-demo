import { defineComponent } from "vue";
import s from "./NotFound.module.scss";
export const NotFound = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <h1>404</h1>
        <h4>页面未找到</h4>
      </div>
    );
  },
});
