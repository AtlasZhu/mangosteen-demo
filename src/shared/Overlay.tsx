import { defineComponent, PropType } from "vue";
import svgChart2 from "../assets/icons/chart2.svg";
import svgExport from "../assets/icons/export.svg";
import svgNotify from "../assets/icons/notify.svg";
import { Icon } from "./Icon";
import s from "./Overlay.module.scss";
export const Overlay = defineComponent({
  props: {
    onClick: { type: Function as PropType<(e: MouseEvent) => void> },
  },
  setup(props) {
    return () => (
      <>
        <div class={s.mask} onClick={props.onClick}></div>
        <div class={s.overlay}>
          <section></section>
          <nav>
            <ul>
              <li>
                <Icon iconName={svgExport} class={s.icon}></Icon>
                <span>导出数据</span>
              </li>
              <li>
                <Icon iconName={svgChart2} class={s.icon}></Icon>
                <span>统计图表</span>
              </li>
              <li>
                <Icon iconName={svgNotify} class={s.icon}></Icon>
                <span>记账提醒</span>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
