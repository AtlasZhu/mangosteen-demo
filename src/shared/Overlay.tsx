import { defineComponent, PropType, Transition } from "vue";
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
          <div class={s.userStatus}>
            <h1>未登录用户</h1>点击这里登录
          </div>
          <nav class={s.navList}>
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
