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
    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "+", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "-", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: "删", onClick: () => {} },
      { text: "提交", onClick: () => {} },
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
            <Cell
              title={refDate.value.join("-")}
              is-link
              onClick={showDatePicker}
            />
            <Popup
              v-model:show={refDatePickerVisible.value}
              position="bottom"
              style="{ height: '30%' }">
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
          <span class={s.amount}>250￥</span>
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
