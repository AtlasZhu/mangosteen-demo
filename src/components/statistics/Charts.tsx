import { computed, defineComponent, onMounted, ref } from "vue";
import { http } from "../../shared/Http";
import { BarChart } from "./BarChart";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

type Data1Item = { happen_at: string; amount: number };
type Data1 = Data1Item[];
export const Charts = defineComponent({
  props: {
    startTime: { type: String },
    endTime: { type: String },
  },
  setup(props) {
    const kind = ref("expenses");
    const data1 = ref<Data1>([]);
    const betterData1 = computed<[string, number][]>(() => data1.value.map(item => [item.happen_at, item.amount]));
    console.log(props.startTime, props.endTime);
    onMounted(() => {
      http
        .get<{ groups: Data1; summary: number }>("/items/summary", {
          happen_after: props.startTime,
          happen_before: props.endTime,
          kind: kind.value,
        })
        .then(response => {
          console.log("response.data:", response.data);
          data1.value = response.data.groups;
        })
        .catch();
    });

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
          <LineChart class={s.lineChart} data={betterData1.value}></LineChart>
          <PieChart class={s.pieChart}></PieChart>
          <BarChart></BarChart>
        </div>
      </div>
    );
  },
});
