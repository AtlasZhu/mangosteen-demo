import { Overlay } from "vant";
import { PropType, defineComponent, reactive, ref } from "vue";
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
  props: { component: { type: Object as PropType<typeof demo>, required: true } },
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

    const customTime = reactive<{ start?: string; end?: string }>({ start: undefined, end: undefined });
    const refCustomList = ref<HTMLDivElement>();
    const displayOverlay = () => {
      if (customTime.start && customTime.end && refCustomList.value) {
        const refCustomListValue = refCustomList.value as any;
        refCustomListValue.loadFirstPage?.();
      }
      changeOverlayVisible();
    };
    const hideOverlay = changeOverlayVisible;
    return () => (
      <MainLayout>
        {{
          icon: () => <OverlayIcon></OverlayIcon>,
          title: () => "菠萝账本",
          content: () => (
            <>
              <Tabs
                v-model:selected={refSelected.value}
                onUpdate:selected={value => {
                  if (value === "自定义时间") changeOverlayVisible();
                }}>
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
              <Overlay show={refOverlayVisible.value} class={s.overlayWrapper}>
                <div class={s.overlayContent}>
                  <header>请选择时间</header>
                  <main>
                    <label>
                      开始时间: <input v-model={customTime.start}></input>
                    </label>
                    <label>
                      结束时间: <input v-model={customTime.end}></input>
                    </label>
                  </main>
                  <footer>
                    <Button onClick={hideOverlay} class={s.cancel}>
                      取消
                    </Button>
                    <Button onClick={displayOverlay} class={s.confirm}>
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
