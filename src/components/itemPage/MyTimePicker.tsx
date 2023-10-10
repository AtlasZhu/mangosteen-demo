import { Cell, DatePicker, Popup } from "vant";
import { defineComponent, reactive } from "vue";
import { Time } from "../../shared/time";

export const MyTimePicker = defineComponent({
  props: {
    title: { type: String, required: true },
    date: { type: Date, required: false },
    onConfirm: {
      type: Function,
    },
  },

  setup(props, context) {
    if (!props.date) return () => <div>未绑定date</div>;

    type Picker = {
      visible: boolean;
      dateSelected: string[];
      pickerModelDate: string[];
    };

    const pInfo = reactive<Picker>({
      visible: false,
      dateSelected: new Time(props.date).formatAsArray(["YYYY", "MM", "DD"]),
      pickerModelDate: new Time(props.date).formatAsArray(["YYYY", "MM", "DD"]),
    });
    const togglePickerVisible = () => {
      pInfo.visible = !pInfo.visible;
    };
    const onClickConfirm = () => {
      pInfo.dateSelected = pInfo.pickerModelDate;
      const [year, month, day] = pInfo.dateSelected;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      context.emit("update:date", date);
      props.onConfirm?.();
      togglePickerVisible();
    };
    return () => (
      <div>
        <Cell title={pInfo.dateSelected.join("-")} is-link onClick={togglePickerVisible} />
        <Popup v-model:show={pInfo.visible} position="bottom" style="{ height: '30%' }">
          <DatePicker
            v-model={pInfo.pickerModelDate}
            title="选择日期"
            onConfirm={onClickConfirm}
            onCancel={togglePickerVisible}
          />
        </Popup>
      </div>
    );
  },
});
