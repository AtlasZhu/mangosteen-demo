import { showDialog } from "vant";
import "vant/es/dialog/style";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { http } from "../../shared/Http";
import { Tab, Tabs } from "../../shared/Tabs";
import { onAxiosError } from "../../shared/validate";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./ItemTags";
export const ItemCreate = defineComponent({
  setup() {
    const formData = reactive({
      kind: "expenses",
      tags_id: [],
      happen_at: new Date().toISOString(),
      amount: 0,
    });
    const router = useRouter();
    const handleError = (data: any) => showDialog({ title: "错误", message: Object.values(data.errors).join("\n") });
    const onSubmit = () => {
      http
        .post("/items", formData, { _autoLoading: true })
        .then(() => {
          router.push("/items/list");
        })
        .catch(error => onAxiosError(error, 422, handleError, false));
    };
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => "记一笔",
          content: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind}>
                <Tab value="expenses" name="支出">
                  <ItemTags kind="expenses" v-model:selected={formData.tags_id[0]} />
                </Tab>
                <Tab value="expenses" name="收入">
                  <ItemTags kind="income" v-model:selected={formData.tags_id[0]} />
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
