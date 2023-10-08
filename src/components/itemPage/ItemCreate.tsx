import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./ItemTags";
export const ItemCreate = defineComponent({
  setup() {
    const refSelected = ref("支出");

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
                  <ItemTags kind="expenses"></ItemTags>
                </Tab>
                <Tab name="收入">
                  <ItemTags kind="income"></ItemTags>
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
