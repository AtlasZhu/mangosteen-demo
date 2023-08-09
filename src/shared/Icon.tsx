import { PropType, defineComponent } from "vue";
export const Icon = defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <svg>
        <use xlinkHref={`#${props.iconName}`}></use>
      </svg>
    );
  },
});
