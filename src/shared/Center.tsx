import { defineComponent, PropType } from "vue";
import s from "./Center.module.scss";

export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"column" | "row">,
      default: "column",
    },
  },
  setup(props, context) {
    return () => <div class={[s.center, s[props.direction]]}>{context.slots.default?.()}</div>;
  },
});
