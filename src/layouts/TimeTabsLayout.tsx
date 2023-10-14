import { Overlay, showDialog } from "vant";
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
      const start = new Time(datePickerSelect.start);
      const end = new Time(datePickerSelect.end);
      const startString = new Time(datePickerSelect.start).formatAsString();
      const endString = new Time(datePickerSelect.end).formatAsString();

      if (startString !== endString && refCustomList.value) {
        if (start.getTimeStamp() > end.getTimeStamp()) {
          showDialog({ title: "日期选择错误", message: "开始时间不能大于截止时间" });
          return;
        }
        customTime.start = startString;
        customTime.end = endString;
        const refCustomListValue = refCustomList.value as any;
        console.log(1, startString, endString);
        refCustomListValue.loadFirstPage(startString, endString);
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
                  <Tab value="本月" name="本月">
                    <props.component startTime={timeList[0].start} endTime={timeList[0].end} />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component startTime={timeList[1].start} endTime={timeList[1].end} />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
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
                  <Tab value="本月" name="本月">
                    <props.component startTime={timeList[0].start} endTime={timeList[0].end} />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component startTime={timeList[1].start} endTime={timeList[1].end} />
                  </Tab>
                  <Tab value="今年" name="今年">
                    <props.component startTime={timeList[2].start} endTime={timeList[2].end} />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      v-show={customTime.start && customTime.end}
                      ref={refCustomList}
                      startTime={customTime.start}
                      endTime={customTime.end}
                    />
                    {!(customTime.start && customTime.end) && <div>请先选择起始时间，和截至时间</div>}
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
                        v-model:date={datePickerSelect.start}
                        defaultMessage="点击这里选择"></MyTimePicker>
                    </div>
                    <div>
                      截止时间:
                      <MyTimePicker
                        class={s.picker}
                        title="选择截止时间"
                        v-model:date={datePickerSelect.end}
                        defaultMessage="点击这里选择"></MyTimePicker>
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
