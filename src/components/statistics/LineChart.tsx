import * as echarts from "echarts";
import { PropType, defineComponent, onMounted, ref, watch } from "vue";
import { Time } from "../../shared/time";
import { getMoney } from "../../shared/utils";

const echartsOptions = {
  tooltip: {
    show: true,
    trigger: "axis",
    formatter: ([item]: any) => {
      const [x, y] = item.data;
      return `${new Time(new Date(x)).formatAsString("YYYY年MM月DD日")} ￥${getMoney(y)}`;
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
  xAxis: {
    type: "time",
    boundaryGap: ["3%", "0%"],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).formatAsString("MM-DD"),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
    axisLabel: {
      show: false,
    },
  },
};
export const LineChart = defineComponent({
  props: { data: { type: Array as PropType<[string, number][]>, required: true } },
  setup(props) {
    const refDiv = ref<HTMLDivElement>();
    let refChart: echarts.ECharts;

    onMounted(() => {
      if (!refDiv.value) return console.log("ref绑定失败");
      refChart = echarts.init(refDiv.value);
      refChart.setOption({
        ...echartsOptions,
        series: [
          {
            data: props.data,
            type: "line",
          },
        ],
      });
      console.log("init");
    });
    watch(
      () => props.data,
      () => {
        refChart.setOption({ series: [{ data: props.data }] });
      },
    );
    return () => <div ref={refDiv}></div>;
  },
});
