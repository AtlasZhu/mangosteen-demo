import { defineComponent, ref } from "vue";
import svgMenu from "../../assets/icons/menu.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
  setup() {
    const refSelected = ref("本月");
    const time = new Time();
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      { start: time.add(-1, "month").firstDayOfMonth(), end: time.add(-1, "month").lastDayOfMonth() },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() },
    ];
    const customTime = ref({ start: new Time(), end: new Time() });
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgMenu} />,
          title: () => "菠萝账本",
          content: () => (
            <Tabs v-model:selected={refSelected.value}>
              <Tab name="本月">
                <ItemSummary
                  startTime={timeList[0].start.formatAsString()}
                  endTime={timeList[0].end.formatAsString()}
                />
              </Tab>
              <Tab name="上月">
                <ItemSummary
                  startTime={timeList[1].start.formatAsString()}
                  endTime={timeList[1].end.formatAsString()}
                />
              </Tab>
              <Tab name="今年">
                <ItemSummary
                  startTime={timeList[2].start.formatAsString()}
                  endTime={timeList[2].end.formatAsString()}
                />
              </Tab>
              <Tab name="自定义时间">
                <ItemSummary
                  startTime={customTime.value.start.formatAsString()}
                  endTime={customTime.value.end.formatAsString()}
                />
              </Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    );
  },
});
