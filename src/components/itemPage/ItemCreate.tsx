import { showDialog } from "vant";
import "vant/es/dialog/style";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { OverlayIcon } from "../../shared/OverlayIcon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Rules, assignErrors, hasError, onAxiosError, validate } from "../../shared/validate";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./ItemTags";
export const ItemCreate = defineComponent({
  setup() {
    const formData = reactive<Partial<Item>>({
      kind: "expenses",
      tag_ids: [],
      happen_at: new Date().toISOString(),
      amount: 0,
    });
    const formErrors = reactive<FormErrors<typeof formData>>({ kind: [], tag_ids: [], amount: [], happen_at: [] });
    const rules: Rules<typeof formData> = [
      { key: "kind", type: "required", message: "类型必填" },
      { key: "tag_ids", type: "required", message: "标签必填" },
      { key: "amount", type: "required", message: "金额必填" },
      { key: "amount", type: "notEqual", value: 0, message: "金额不能为0" },
      { key: "happen_at", type: "required", message: "时间必填" },
    ];
    const router = useRouter();
    const handleError = (errors: typeof formErrors) =>
      showDialog({
        title: "错误",
        message: Object.values(errors)
          .filter(item => item.length > 0)
          .join("\n"),
      });
    const onSubmit = () => {
      assignErrors(formErrors, validate(formData, rules));
      if (formData.tag_ids?.length === 0) {
        formErrors.tag_ids.push("标签必填");
      }
      if (hasError(formErrors)) {
        handleError(formErrors);
        return;
      }
      http
        .post("/items", formData, { _autoLoading: true })
        .then(() => {
          router.push("/items/list");
        })
        .catch(error =>
          onAxiosError(
            error,
            422,
            (data: { errors: typeof formErrors }) => {
              handleError(data.errors);
            },
            false,
          ),
        );
    };
    return () => (
      <MainLayout>
        {{
          icon: () => <OverlayIcon></OverlayIcon>,
          title: () => "记一笔",
          content: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind}>
                <Tab value="expenses" name="支出">
                  <ItemTags kind="expenses" v-model:selected={formData.tag_ids![0]} />
                </Tab>
                <Tab value="income" name="收入">
                  <ItemTags kind="income" v-model:selected={formData.tag_ids![0]} />
                </Tab>
              </Tabs>
              <InputPad
                class={s.inputPad}
                v-model:time={formData.happen_at}
                v-model:amount={formData.amount}
                onSubmit={onSubmit}></InputPad>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
