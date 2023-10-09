import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { TagForm } from "./TagForm";
import s from "./TagForm.module.scss";
import { BackIcon } from "../../shared/BackIcon";
export const TagsEdit = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => "新建标签",
          content: () => (
            <>
              <TagForm />
              <div class={s.actions}>
                <Button class={s.deleteTag} level="danger">
                  删除标签
                </Button>
                <Button class={s.deleteTagAndRecord} level="danger">
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
