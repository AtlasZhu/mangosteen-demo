import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { TagForm } from "./TagForm";
import { BackIcon } from "../../shared/BackIcon";
export const TagsCreate = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => "新建标签",
          content: () => <TagForm></TagForm>,
        }}
      </MainLayout>
    );
  },
});
