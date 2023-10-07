import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from "./WelcomeLayout.module.scss";
export const WelcomeNextPageButton = defineComponent({
  props: { nextPageUrl: { type: String, required: true } },
  setup(props) {
    return () => {
      if (props.nextPageUrl !== "/start") {
        return (
          <div class={s.actions}>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to={props.nextPageUrl}>下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </div>
        );
      } else {
        return (
          <div class={s.actions}>
            <RouterLink to="/start">开启应用</RouterLink>
          </div>
        );
      }
    };
  },
});
