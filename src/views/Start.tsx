import { defineComponent, ref } from "vue";
import { useSwipe } from "../hooks/useSwipe";
export const Start = defineComponent({
  setup() {
    const ele = ref<HTMLElement>();
    const { swiping, distance, direction } = useSwipe(ele, {
      beforeStart: (e) => e.preventDefault(),
    });
    // watchEffect(() => {
    //   console.log(swiping.value, distance.value, direction.value);
    // });
    return () => (
      <div ref={ele}>
        你好
        <hr />
        {JSON.stringify(swiping.value)}
        <hr />
        {JSON.stringify(distance.value)}
        <hr />
        {direction.value}
        <hr />
        这是开始页面
      </div>
    );
  },
});
