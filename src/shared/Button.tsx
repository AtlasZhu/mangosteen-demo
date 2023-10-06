import { PropType, defineComponent } from "vue";
import s from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important",
    },
    disabled: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const classArray = [s.button];
    const levelMap = { important: s.important, normal: s.normal, danger: s.danger };
    if (props.level) {
      classArray.push(levelMap[props.level]);
    } else {
      classArray.push(s.important);
    }
    return () => (
      <button disabled={props.disabled} onClick={props.onClick} class={classArray}>
        {context.slots.default?.()}
      </button>
    );
  },
});
