import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";

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
            <>
              <Tabs v-model:selected={refSelected.value}>
                <Tab name="支出">icon列表</Tab>
                <Tab name="收入">icon列表2</Tab>
              </Tabs>
              <InputPad></InputPad>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
