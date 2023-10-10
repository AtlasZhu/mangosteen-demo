import { defineComponent, ref } from "vue";
import { BarChart } from "./BarChart";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

export const Charts = defineComponent({
  props: {
    startTime: { type: String },
    endTime: { type: String },
  },
  setup() {
    const kind = ref("expenses");
    return () => (
      <div class={s.wrapper}>
        <div class={s.selectWrapper}>
          类型:
          <select v-model={kind.value}>
            <option value="expenses">支出</option>
            <option value="income">收入</option>
          </select>
        </div>
        <div class={s.chartsWrapper}>
          <LineChart class={s.lineChart}></LineChart>
          <PieChart class={s.pieChart}></PieChart>
          <BarChart></BarChart>
        </div>
      </div>
    );
  },
});
