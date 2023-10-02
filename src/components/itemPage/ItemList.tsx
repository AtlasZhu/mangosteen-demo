import { defineComponent, ref } from "vue";
import svgMenu from "../../assets/icons/menu.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
export const ItemList = defineComponent({
  setup() {
    const refSelected = ref("本月");
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgMenu} />,
          title: () => "菠萝账本",
          content: () => (
            <Tabs v-model:selected={refSelected.value}>
              <Tab name="本月"></Tab>
              <Tab name="上月"></Tab>
              <Tab name="今年"></Tab>
              <Tab name="自定义时间"></Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    );
  },
});
