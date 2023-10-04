import { defineComponent } from "vue";
export const Charts = defineComponent({
  props: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  setup() {
    return () => <>这里呈现各种图标</>;
  },
});
