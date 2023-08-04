import { defineComponent, ref } from "vue";
import { throttle } from "../hooks/throttle";
import { useSwipe } from "../hooks/useSwipe";
export const Start = defineComponent({
  setup() {
    const ele = ref<HTMLElement>();
    const { swiping, distance, direction } = useSwipe(ele, {
      beforeStart: (e) => e.preventDefault(),
    });
    const click = throttle(() => {
      console.log("hihi");
    }, 3000);
    // watchEffect(() => {
    //   console.log(swiping.value, distance.value, direction.value);
    // });
    return () => (
      <>
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
          <hr />
        </div>
        <div onClick={click}>loghi</div>
      </>
    );
  },
});
