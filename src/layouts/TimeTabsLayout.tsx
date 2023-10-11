import { Overlay } from "vant";
import { PropType, defineComponent, reactive, ref } from "vue";
import { MyTimePicker } from "../components/itemPage/MyTimePicker";
import { Button } from "../shared/Button";
import { OverlayIcon } from "../shared/OverlayIcon";
import { Tab, Tabs } from "../shared/Tabs";
import { Time } from "../shared/time";
import { MainLayout } from "./MainLayout";
import s from "./TimeTabsLayout.module.scss";
const demo = defineComponent({
  props: {
    startTime: { type: String },
    endTime: { type: String },
  },
});
export const TimeTabsLayout = defineComponent({
  props: {
    component: { type: Object as PropType<typeof demo>, required: true },
    rerenderOnChangeTab: {
      type: Boolean,
      default: false,
    },
    hideThisYear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const refSelected = ref("本月");
    const time = new Time();
    const timeList = [
      { start: time.firstDayOfMonth().formatAsString(), end: time.lastDayOfMonth().formatAsString() },
      {
        start: time.add(-1, "month").firstDayOfMonth().formatAsString(),
        end: time.add(-1, "month").lastDayOfMonth().formatAsString(),
      },
      { start: time.firstDayOfYear().formatAsString(), end: time.lastDayOfYear().formatAsString() },
    ];

    const refOverlayVisible = ref(false);
    const changeOverlayVisible = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };

    const datePickerSelect = reactive({
      start: new Date(),
      end: new Date(),
    });

    const customTime = reactive<{ start?: string; end?: string }>({ start: undefined, end: undefined });
    const refCustomList = ref<HTMLDivElement>();

    const onConfirm = () => {
      const start = new Time(datePickerSelect.start).formatAsString();
      const end = new Time(datePickerSelect.end).formatAsString();
      if (start !== end && refCustomList.value) {
        customTime.start = start;
        customTime.end = end;
        const refCustomListValue = refCustomList.value as any;
        refCustomListValue.loadFirstPage?.();
      }
      changeOverlayVisible();
    };
    const onCancel = changeOverlayVisible;

    return () => (
      <MainLayout>
        {{
          icon: () => <OverlayIcon></OverlayIcon>,
          title: () => "菠萝账本",
          content: () => (
            <>
              {props.hideThisYear ? (
                <Tabs
                  v-model:selected={refSelected.value}
                  onUpdate:selected={value => {
                    if (value === "自定义时间") changeOverlayVisible();
                  }}
                  rerenderOnChangeTab={props.rerenderOnChangeTab}>
                  <Tab name="本月">
                    <props.component startTime={timeList[0].start} endTime={timeList[0].end} />
                  </Tab>
                  <Tab name="上月">
                    <props.component startTime={timeList[1].start} endTime={timeList[1].end} />
                  </Tab>
                  <Tab name="自定义时间">
                    <props.component ref={refCustomList} startTime={customTime.start} endTime={customTime.end} />
                  </Tab>
                </Tabs>
              ) : (
                <Tabs
                  v-model:selected={refSelected.value}
                  onUpdate:selected={value => {
                    if (value === "自定义时间") changeOverlayVisible();
                  }}
                  rerenderOnChangeTab={props.rerenderOnChangeTab}>
                  <Tab name="本月">
                    <props.component startTime={timeList[0].start} endTime={timeList[0].end} />
                  </Tab>
                  <Tab name="上月">
                    <props.component startTime={timeList[1].start} endTime={timeList[1].end} />
                  </Tab>
                  <Tab name="今年">
                    <props.component startTime={timeList[2].start} endTime={timeList[2].end} />
                  </Tab>
                  <Tab name="自定义时间">
                    <props.component ref={refCustomList} startTime={customTime.start} endTime={customTime.end} />
                  </Tab>
                </Tabs>
              )}

              <Overlay show={refOverlayVisible.value} class={s.overlayWrapper}>
                <div class={s.overlayContent}>
                  <header>请选择时间</header>
                  <main>
                    <div>
                      开始时间:
                      <MyTimePicker
                        class={s.picker}
                        title="选择开始时间"
                        v-model:date={datePickerSelect.start}></MyTimePicker>
                    </div>
                    <div>
                      结束时间:
                      <MyTimePicker
                        class={s.picker}
                        title="选择截至时间"
                        v-model:date={datePickerSelect.end}></MyTimePicker>
                    </div>
                  </main>
                  <footer>
                    <Button onClick={onCancel} class={s.cancel}>
                      取消
                    </Button>
                    <Button onClick={onConfirm} class={s.confirm}>
                      确定
                    </Button>
                  </footer>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
