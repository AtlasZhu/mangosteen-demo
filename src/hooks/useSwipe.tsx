import { Ref, computed, onMounted, onUnmounted, ref } from "vue";

type Point = { x: number; y: number };
interface Options {
  beforeStart?: (e: TouchEvent) => void;
  afterStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  afterMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  afterEnd?: (e: TouchEvent) => void;
}
export const useSwipe = (
  element: Ref<HTMLElement | undefined>,
  options?: Options
) => {
  const start = ref<Point>();
  const end = ref<Point>();
  const swiping = ref(false);
  const distance = computed(() => {
    if (!start.value || !end.value) return;
    return { x: end.value.x - start.value.x, y: end.value.y - start.value.y };
  });
  const direction = computed(() => {
    //这里有待斟酌，如果需求是松开手指的时候才判断方向则去掉叹号，如果每次移动手指都判断方向（以起点作为参照）则加上叹号
    if (!swiping.value) return;
    if (
      !distance.value ||
      Math.abs(distance.value.x) < 24 ||
      Math.abs(distance.value.y) < 24
    )
      return;

    const { x, y } = distance.value;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  });
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    swiping.value = true;
    start.value = end.value = {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY,
    };
    options?.afterStart?.(e);
  };
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    if (!swiping.value) return;
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY };
    options?.afterMove?.(e);
  };
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    swiping.value = false;
    options?.afterEnd?.(e);
  };
  onMounted(() => {
    if (!element.value) return;
    element.value.addEventListener("touchstart", onStart);
    element.value.addEventListener("touchmove", onMove);
    element.value.addEventListener("touchend", onEnd);
  });
  onUnmounted(() => {
    if (!element.value) return;
    element.value.removeEventListener("touchstart", onStart);
    element.value.removeEventListener("touchmove", onMove);
    element.value.removeEventListener("touchend", onEnd);
  });
  return { swiping, distance, direction };
};
