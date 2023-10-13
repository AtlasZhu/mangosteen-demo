import { onMounted } from "vue";
import { useMeStore } from "../stores/useMeStore";
export const useAfterMe = (fn: Function) => {
  onMounted(async () => {
    const meStore = useMeStore();
    await meStore.mePromise;
    fn();
  });
};
