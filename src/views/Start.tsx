import { defineComponent, ref } from "vue";
import menu from "../assets/icons/menu.svg";
import pig from "../assets/icons/pig.svg";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { NavBar } from "../shared/NavBar";
import { Overlay } from "../shared/Overlay";
import s from "./Start.module.scss";

export const Start = defineComponent({
  setup() {
    const overlayVisible = ref(false);
    const changeOverlayVisible = () => {
      overlayVisible.value = !overlayVisible.value;
      console.log(overlayVisible.value);
    };
    return () => (
      <>
        <NavBar>
          {{
            icon: (cls: string) => (
              <Icon
                iconName={menu}
                class={cls}
                onClick={changeOverlayVisible}
              ></Icon>
            ),
            default: () => "菠萝账本",
          }}
        </NavBar>
        <Center class={s.pig_wrapper}>
          <Icon iconName={pig} class={s.pig}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button}>开始记账</Button>
        </div>
        <FloatButton onClick={changeOverlayVisible}></FloatButton>
        {overlayVisible.value && (
          <Overlay onClick={changeOverlayVisible}></Overlay>
        )}
      </>
    );
  },
});
