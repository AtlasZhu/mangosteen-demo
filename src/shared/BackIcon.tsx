import { defineComponent } from "vue";
import { Icon } from "./Icon";
import svgBack from "../assets/icons/back.svg";
import { useRoute, useRouter } from "vue-router";
export const BackIcon = defineComponent({
  setup() {
    const { return_to } = useRoute().query;
    const router = useRouter();
    const iconClick = () => {
      if (return_to) {
        router.push(return_to.toString());
      } else {
        router.back();
      }
    };
    return () => <Icon iconName={svgBack} onClick={iconClick} />;
  },
});
