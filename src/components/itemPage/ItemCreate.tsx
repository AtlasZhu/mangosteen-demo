import { defineComponent, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import svgPlus from "../../assets/icons/plus.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup() {
    const refSelected = ref("支出");
    type Tag = { id: number; name: string; sign: string; kind: "expenses" | "income" };
    const expenseTagExample = {
      id: 1,
      name: "餐费",
      sign: "￥",
      kind: "expenses",
    };
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);
    onMounted(() => {
      http
        .get<{ resources: Tag[] }>("/tags", { kind: "expenses" })
        .then(response => (refExpensesTags.value = response.data.resources));
    });
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
              <Tabs v-model:selected={refSelected.value}>
                <Tab name="支出">
                  <div class={s.tag_wrapper}>
                    <ul>
                      <li>
                        <div class={s.addTag}>
                          <RouterLink to={"/tags/create"}>
                            <Icon iconName={svgPlus}></Icon>
                          </RouterLink>
                        </div>
                        <div>{"增加"}</div>
                      </li>
                      {refExpensesTags.value.map(tag => (
                        <li>
                          <div class={s.sign}>{tag.sign}</div>
                          <span class={s.name}>{tag.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tab>

                <Tab name="收入">
                  <div class={s.tag_wrapper}>
                    <ul>
                      <li>
                        <div class={s.addTag}>
                          <RouterLink to={"/tags/create"}>
                            <Icon iconName={svgPlus}></Icon>
                          </RouterLink>
                        </div>
                        <div>{"增加"}</div>
                      </li>
                      {refIncomeTags.value.map(tag => (
                        <li>
                          <div class={s.sign}>{tag.sign}</div>
                          <div class={s.name}>{tag.name}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tab>
              </Tabs>
              <InputPad class={s.inputPad}></InputPad>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
