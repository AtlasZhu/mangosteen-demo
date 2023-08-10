import { defineComponent } from "vue";
import pig from "../assets/icons/pig.svg";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import s from "./Start.module.scss";

export const Start = defineComponent({
  setup() {
    const onClick = () => {
      console.log("click");
    };
    return () => (
      <div>
        <nav>menu</nav>
        <Center class={s.pig_wrapper}>
          <Icon iconName={pig} class={s.pig}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            开始记账
          </Button>
          <FloatButton onClick={onClick}></FloatButton>
        </div>
      </div>
    );
  },
});
