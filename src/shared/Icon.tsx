import { defineComponent, PropType } from "vue";

export const Icon = defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup(props) {
    return () => (
      <svg onClick={props.onClick}>
        <use xlinkHref={`#${props.iconName}`}></use>
      </svg>
    );
  },
});
