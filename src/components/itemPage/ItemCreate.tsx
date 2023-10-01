import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup() {
    const refSelected = ref("支出");
    const refExpensesTags = ref([
      {
        id: 1,
        name: "餐费",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 2,
        name: "车费",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 3,
        name: "娱乐",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 3,
        name: "娱乐",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 3,
        name: "娱乐",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 3,
        name: "娱乐",
        sign: "￥",
        category: "expenses",
      },
      {
        id: 3,
        name: "娱乐",
        sign: "￥",
        category: "expenses",
      },
    ]);
    const refIncomeTags = ref([
      {
        id: 4,
        name: "工资",
        sign: "￥",
        category: "expenses",
      },
    ]);
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
            <>
              <Tabs v-model:selected={refSelected.value}>
                <Tab name="支出">
                  <ul class={s.tag_wrapper}>
                    {refExpensesTags.value.map(tag => (
                      <li>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </li>
                    ))}
                  </ul>
                </Tab>
                <Tab name="收入">
                  <ul class={s.tag_wrapper}>
                    {refIncomeTags.value.map(tag => (
                      <li>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </li>
                    ))}
                  </ul>
                </Tab>
              </Tabs>
              <InputPad></InputPad>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
