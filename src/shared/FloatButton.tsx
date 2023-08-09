import { PropType, defineComponent } from "vue";
import s from "./FloatButton.module.scss";
import plus from "../assets/icons/plus.svg";
import { Icon } from "./Icon";
export const FloatButton = defineComponent({
  props: {
    onClick: Function as PropType<(payload: MouseEvent) => void | undefined>,
  },
  setup(props) {
    return () => (
      <div class={s.floatButton} onClick={props?.onClick}>
        <Icon class={s.icon} iconName={plus}></Icon>
      </div>
    );
  },
});
