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

export default ItemPage;
