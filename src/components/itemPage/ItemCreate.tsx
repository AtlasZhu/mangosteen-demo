import { showDialog } from "vant";
import "vant/es/dialog/style";
import { defineComponent, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./ItemTags";
export const ItemCreate = defineComponent({
  setup() {
    const formData = reactive({
      kind: "支出",
      tags_id: [],
      happen_at: new Date().toISOString(),
      amount: 0,
    });
    const router = useRouter();
    const onSubmit = () => {
      http
        .post("/items", formData)
        .then(() => {
          router.push("/items/list");
        })
        .catch(error => {
          if (error.response?.status === 422) {
            showDialog({
              title: "错误",
              message: Object.values(error.response.data.errors).join("\n"),
            });
          }
        });
    };
    return () => (
      <MainLayout>
        {{
          icon: () => (
            <RouterLink to="/start">
              <Icon iconName={svgBack} />
            </RouterLink>
          ),
          title: () => "记一笔",
          content: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind}>
                <Tab name="支出">
                  <ItemTags kind="expenses" v-model:selected={formData.tags_id[0]} />
                </Tab>
                <Tab name="收入">
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
