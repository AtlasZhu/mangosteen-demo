import { Cell, DatePicker, Popup } from "vant";
import "vant/es/cell/style";
import "vant/es/date-picker/style";
import "vant/es/popup/style";
import { defineComponent, ref } from "vue";
import svgDate from "../../assets/icons/date.svg";
import { Icon } from "../../shared/Icon";
import { time } from "../../shared/time";
import s from "./InputPad.module.scss";
export const InputPad = defineComponent({
  setup() {
    type amountTextType = "." | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    const refAmountText = ref<[amountTextType]>(["0"]);

    const appendAmountText = (text: amountTextType) => {
      if (refAmountText.value.length >= 16) return;
      const dotIndex = refAmountText.value.indexOf(".");
      if (dotIndex > -1 && refAmountText.value.slice(dotIndex + 1).length >= 2) return;

      if (text === ".") {
        if (dotIndex === -1) refAmountText.value.push(text);
        return;
      } else if (text === "0") {
        if (refAmountText.value[0] === "0" && refAmountText.value.length === 1) return;
        else refAmountText.value.push(text);
      } else {
        if (refAmountText.value[0] === "0" && refAmountText.value.length === 1) refAmountText.value.pop();
        refAmountText.value.push(text);
      }
    };
    const clearAmountText = () => {
      refAmountText.value = ["0"];
    };

    const buttons = [
      { text: "提交", onClick: () => {} },
      { text: "清空", onClick: () => clearAmountText() },
      { text: "0", onClick: () => appendAmountText("0") },
      { text: "1", onClick: () => appendAmountText("1") },
      { text: "2", onClick: () => appendAmountText("2") },
      { text: "3", onClick: () => appendAmountText("3") },
      { text: "4", onClick: () => appendAmountText("4") },
      { text: "5", onClick: () => appendAmountText("5") },
      { text: "6", onClick: () => appendAmountText("6") },
      { text: "7", onClick: () => appendAmountText("7") },
      { text: "8", onClick: () => appendAmountText("8") },
      { text: "9", onClick: () => appendAmountText("9") },
      { text: ".", onClick: () => appendAmountText(".") },
    ];
    let currentDate = time().formatAsArray(["YYYY", "MM", "DD"]);
    const refDate = ref(currentDate);
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => {
      refDatePickerVisible.value = true;
    };
    const hideDatePicker = () => {
      refDatePickerVisible.value = false;
    };
    const setDate = (date: any) => {
      refDate.value = date;
    };

    return () => (
      <div class={s.inputPad_wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon iconName={svgDate} class={s.icon} />
            <Cell title={refDate.value.join("-")} is-link onClick={showDatePicker} />
            <Popup v-model:show={refDatePickerVisible.value} position="bottom" style="{ height: '30%' }">
              <DatePicker
                v-model={currentDate}
                title="选择日期"
                onConfirm={date => {
                  setDate(date.selectedValues);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
            </Popup>
          </span>
          <span class={s.amount}>{refAmountText.value.join("")}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(item => (
            <button onClick={item.onClick}>{item.text}</button>
          ))}
        </div>
      </div>
    );
  },
});
