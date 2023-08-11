import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export const ItemPage = defineComponent({
  setup() {
    return () => (
      <>
        <RouterView />
      </>
    );
  },
});
