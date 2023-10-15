import { PropType, computed, defineComponent, ref, watch } from "vue";
import { useAfterMe } from "../../hooks/useAfterMe";
import { http } from "../../shared/Http";
import { Time } from "../../shared/time";
import { useMeStore } from "../../stores/useMeStore";
import { BarChart } from "./BarChart";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

const DAY = 24 * 3600 * 1000;

type Data1Item = { happen_at: string; amount: number };
type Data1 = Data1Item[];
type Data2Item = { tag_id: number; tag: Tag; amount: number };
type Data2 = Data2Item[];
export const Charts = defineComponent({
  props: {
    startTime: {
      type: String as PropType<string>,
      required: false,
    },
    endTime: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const kind = ref("expenses");
    const data1 = ref<Data1>([]);
    const meStore = useMeStore();
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startTime || !props.endTime || !data1.value[0]) {
        return [];
      }
      const diff = new Date(props.endTime).getTime() - new Date(props.startTime).getTime();
      const n = diff / DAY + 1;
      return Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startTime + "T00:00:00.000+0800").add(i, "day").getTimeStamp();
        const item = data1.value[0];
        const amount =
          item && new Date(item?.happen_at + "T00:00:00.000+0800").getTime() === time ? data1.value.shift()!.amount : 0;
        return [new Date(time).toISOString(), amount];
      });
    });

    const fetchData1 = async () => {
      if (!props.startTime || !props.endTime) return;
      await meStore.mePromise;
      const response = await http.get<{ groups: Data1; summary: number }>(
        "/items/summary",
        {
          happen_after: props.startTime,
          happen_before: props.endTime,
          kind: kind.value,
          group_by: "happen_at",
        },
        { _autoLoading: true },
      );
      data1.value = response.data.groups;
    };
    useAfterMe(fetchData1);
    watch(() => kind.value, fetchData1);

    const data2 = ref<Data2>([]);
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map(item => ({
        name: item.tag.name,
        value: item.amount,
      })),
    );

    const fetchData2 = async () => {
      if (!props.startTime || !props.endTime) return;
      await meStore.mePromise;
      const response = await http.get<{ groups: Data2; summary: number }>("/items/summary", {
        happen_after: props.startTime,
        happen_before: props.endTime,
        kind: kind.value,
        group_by: "tag_id",
      });
      data2.value = response.data.groups;
    };
    useAfterMe(fetchData2);
    watch(() => kind.value, fetchData2);

    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0);
      return data2.value.map(item => ({
        ...item,
        percent: Math.round((item.amount / total) * 10000) / 100,
      }));
    });

    const loadFirstPage = () => {
      fetchData1();
      fetchData2();
    };
    context.expose({ loadFirstPage });

    return () => {
      if (!props.endTime || !props.startTime) return <div>请先选择时间</div>;
      return (
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
            <PieChart class={s.pieChart} data={betterData2.value}></PieChart>
            <BarChart data={betterData3.value}></BarChart>
          </div>
        </div>
      );
    };
  },
});
