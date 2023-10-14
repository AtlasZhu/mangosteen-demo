import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
import svgPig from "../assets/icons/pig.svg";
import { Center } from "./Center";
import s from "./ComingSoon.module.scss";
import { Icon } from "./Icon";
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon iconName={svgPig} class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>

        <RouterLink to="/items/list">
          <div class={s.backToHomePage}>
            <span>点此回到首页</span>
          </div>
        </RouterLink>
      </div>
    );
  },
});
