import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import menu from "../assets/icons/menu.svg";
import pig from "../assets/icons/pig.svg";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
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
      <MainLayout>
        {{
          icon: () => (
            <Icon iconName={menu} onClick={changeOverlayVisible}></Icon>
          ),
          title: () => "菠萝账本",
          content: () => (
            <>
              <Center class={s.pig_wrapper}>
                <Icon iconName={pig} class={s.pig}></Icon>
              </Center>
              <RouterLink to="/items/create">
                <div class={s.button_wrapper}>
                  <Button class={s.button}>开始记账</Button>
                </div>
              </RouterLink>
              <RouterLink to="/items/create">
                <FloatButton></FloatButton>
              </RouterLink>
              {overlayVisible.value && (
                <Overlay onClick={changeOverlayVisible}></Overlay>
              )}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
