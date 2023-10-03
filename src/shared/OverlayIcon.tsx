import { defineComponent, ref } from "vue";
import menu from "../assets/icons/menu.svg";
import { Icon } from "./Icon";
import { Overlay } from "./Overlay";
export const OverlayIcon = defineComponent({
  setup() {
    const overlayVisible = ref(false);
    const changeOverlayVisible = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <>
        <Icon iconName={menu} onClick={changeOverlayVisible}></Icon>
        {overlayVisible.value && <Overlay onClick={changeOverlayVisible}></Overlay>}
      </>
    );
  },
});
