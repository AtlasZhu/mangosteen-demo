import { defineComponent, reactive } from "vue";
import s from "./BarChart.module.scss";
export const BarChart = defineComponent({
  setup() {
    const data = reactive([
      { tag: { id: 1, name: "房租", sign: "x" }, amount: 3000, percent: "" },
      { tag: { id: 2, name: "吃饭", sign: "x" }, amount: 1200, percent: "" },
      { tag: { id: 3, name: "水电", sign: "x" }, amount: 300, percent: "" },
    ]);
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    data.map(item => (item.percent = Math.round((item.amount / total) * 1000) / 10 + "%"));
    return () => (
      <div class={s.wrapper}>
        {data.map(item => (
          <div class={s.barWrapper}>
            <div class={s.sign}>{item.tag.sign}</div>
            <div class={s.content}>
              <div class={s.text}>
                <div>
                  {item.tag.name} - {item.percent}
                </div>
                <div>{item.amount}</div>
              </div>
              <div class={s.bar}></div>
            </div>
          </div>
        ))}
      </div>
    );
  },
});
