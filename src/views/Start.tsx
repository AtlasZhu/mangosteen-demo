import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import s from "./Start.module.scss";
import { FloatButton } from "../shared/FloatButton";
export const Start = defineComponent({
  setup() {
    const btnClick = () => {
      console.log("click");
    };
    return () => (
      <>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={btnClick}>
            开始记账
          </Button>
        </div>
        <FloatButton onClick={btnClick}></FloatButton>
      </>
    );
  },
});
