import { defineComponent } from "vue";
import s from "./Tabs.module.scss";

export const Tabs = defineComponent({
  props: {
    selected: { type: String },
  },
  setup(props, context) {
    return () => {
      const children = context.slots.default?.();
      if (!children) return null;
      for (const childrenKey in children) {
        if (children[childrenKey].type !== Tab)
          throw new Error("Tabs 的子组件只能是 Tab");
      }
      return (
        <div class={s.tabs}>
          <ul class={s.nav}>
            {children.map((item) => (
              <li
                class={item.props?.name === props.selected ? s.selected : null}
                onClick={() =>
                  context.emit("update:selected", item.props?.name)
                }
              >
                {item.props?.name}
              </li>
            ))}
          </ul>
          <div></div>
        </div>
      );
    };
  },
});
export const Tab = defineComponent({
  props: { name: { type: String, required: true } },
  setup(props, context) {
    return () => <div>{context.slots.default?.()}</div>;
  },
});
