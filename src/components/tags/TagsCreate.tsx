import { defineComponent } from "vue";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
export const TagsCreate = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgBack} />,
          title: () => "新建标签",
          content: () => <TagForm></TagForm>,
        }}
      </MainLayout>
    );
  },
});
