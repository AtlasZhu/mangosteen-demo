import { Cell, DatePicker, Popup } from "vant";
import { computed, defineComponent, reactive, ref } from "vue";
import { Time } from "../../shared/time";

export const MyTimePicker = defineComponent({
  props: {
    title: { type: String, required: true },
    date: { type: Date, required: false },
    onConfirm: {
      type: Function,
    },
    defaultMessage: { type: String, required: false },
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
    let timeHasBeenSelected = ref(false);
    const onClickConfirm = () => {
      pInfo.dateSelected = pInfo.pickerModelDate;
      const [year, month, day] = pInfo.dateSelected;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      context.emit("update:date", date);
      timeHasBeenSelected.value = true;
      props.onConfirm?.();
      togglePickerVisible();
    };
    const messageShow = computed(() => {
      if (!props.defaultMessage || timeHasBeenSelected.value) {
        return pInfo.dateSelected.join("-");
      } else {
        return props.defaultMessage;
      }
    });
    return () => {
      return (
        <div>
          <Cell title={messageShow.value} is-link onClick={togglePickerVisible} />
          <Popup v-model:show={pInfo.visible} position="bottom" style="{ height: '30%' }">
            <DatePicker
              modelValue={new Time(props.date).formatAsArray(["YYYY", "MM", "DD"])}
              v-model={pInfo.pickerModelDate}
              title={props.title}
              onConfirm={onClickConfirm}
              onCancel={togglePickerVisible}
            />
          </Popup>
        </div>
      );
    };
  },
});
