import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { TagForm } from "./TagForm";
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

export default TagsCreate;
