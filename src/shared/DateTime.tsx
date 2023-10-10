import { defineComponent } from "vue";
import { Time } from "./time";
export const DateTime = defineComponent({
  props: { time: { type: [String, Date], required: true }, format: { type: String, default: "YYYY-MM-DD HH:mm:ss" } },
  setup(props) {
    const formatTime = (time: string | Date) => new Time(props.time).formatAsString(props.format);
    return () => <div>{formatTime(props.time)}</div>;
  },
});
