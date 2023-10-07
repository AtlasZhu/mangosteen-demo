import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from "./WelcomeLayout.module.scss";
export const WelcomeNextPageButton = defineComponent({
  props: { nextPageUrl: { type: String, required: true } },
  setup(props) {
    const setSkipFeaturesYes = () => {
      localStorage.setItem("skipFeatures", "yes");
    };
    return () => {
      if (props.nextPageUrl !== "/start") {
        return (
          <div class={s.actions}>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to={props.nextPageUrl}>下一页</RouterLink>
            <span onClick={setSkipFeaturesYes}>
              <RouterLink to="/start">跳过</RouterLink>
            </span>
          </div>
        );
      } else {
        return (
          <div class={s.actions} onClick={setSkipFeaturesYes}>
            <RouterLink to="/start">开启应用</RouterLink>
          </div>
        );
      }
    };
  },
});
