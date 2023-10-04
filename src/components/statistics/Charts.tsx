import { defineComponent, ref } from "vue";
import s from "./Charts.module.scss";
export const Charts = defineComponent({
  props: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  setup() {
    const kind = ref("expenses");
    return () => (
      <>
        <div class={s.selectWrapper}>
          类型:
          <select v-model={kind.value}>
            <option value="expenses">支出</option>
            <option value="income">收入</option>
          </select>
        </div>
      </>
    );
  },
});
