import { defineComponent } from "vue";
export const ItemSummary = defineComponent({
  props: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  setup() {
    return () => <>hihihi</>;
  },
});
