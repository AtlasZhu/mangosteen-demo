import { defineComponent } from "vue";
import s from "./Tabs.module.scss";

export const Tabs = defineComponent({
  props: {
    selected: { type: String },
    rerenderOnChangeTab: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:selected"],
  setup(props, context) {
    return () => {
      const children = context.slots.default?.();
      if (!children) return null;
      for (const childrenKey in children) {
        if (children[childrenKey].type !== Tab) throw new Error("Tabs 的子组件只能是 Tab");
      }
      return (
        <div class={s.tabs}>
          <ul class={s.nav}>
            {children.map(item => (
              <li
                class={item.props?.value === props.selected ? s.selected : null}
                onClick={() => context.emit("update:selected", item.props?.value)}>
                {item.props?.name}
              </li>
            ))}
          </ul>
          {props.rerenderOnChangeTab ? (
            <div class={s.tab} key={props.selected}>
              {children.find(item => item.props?.value === props.selected)}
            </div>
          ) : (
            <div class={s.tab}>
              {children.map(item => (
                <div v-show={item.props?.value === props.selected}>{item}</div>
              ))}
            </div>
          )}
        </div>
      );
    };
  },
});
export const Tab = defineComponent({
  props: { name: { type: String, required: true }, value: { type: String, required: true } },
  setup(props, context) {
    return () => <>{context.slots.default?.()}</>;
  },
});
