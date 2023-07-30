import { defineComponent } from "vue";
export const Welcome = defineComponent({
  setup() {
    return () => (
      <>
        <router-view></router-view>
      </>
    );
  },
});
