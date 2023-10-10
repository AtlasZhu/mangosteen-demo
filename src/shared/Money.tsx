import { defineComponent } from "vue";
export const Money = defineComponent({
  props: { amount: { type: Number, required: true } },
  setup(props) {
    const addZero = (n: number) => {
      const nString = n.toString();
      const dotIndex = nString.indexOf(".");
      console.log(nString);

      if (dotIndex < 0) {
        return nString + ".00";
      } else if (dotIndex === nString.length - 2) {
        return nString + "0";
      } else {
        return nString;
      }
    };
    return () => <div>{addZero(props.amount / 100)}￥</div>;
  },
});
