import * as echarts from "echarts";
import { defineComponent, onMounted, ref } from "vue";

export const LineChart = defineComponent({
  setup() {
    const refLineChart = ref<HTMLDivElement>();
    onMounted(() => {
      if (!refLineChart.value) return console.log("ref绑定失败");
      const option = {
        grid: [{ left: 0, right: 0, top: 0, bottom: 20 }],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      echarts.init(refLineChart.value).setOption(option);
    });
    return () => <div ref={refLineChart}></div>;
  },
});
