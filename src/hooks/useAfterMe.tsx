import { onMounted } from "vue";
import { useMeStore } from "../stores/useMeStore";
export const useAfterMe = (success: Function, failed?: Function) => {
  onMounted(async () => {
    const meStore = useMeStore();
    try {
      await meStore.mePromise;
    } catch (error) {
      failed?.();
      return;
    }
    success();
  });
};
