import { showConfirmDialog, showDialog } from "vant";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { TagForm } from "./TagForm";
import s from "./TagForm.module.scss";
export const TagsEdit = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    if (!id) return <div>此Tag的ID不存在</div>;
    const onDelete = (options?: { withItems?: boolean }) => {
      showConfirmDialog({
        title: "删除标签",
        message: "你确定要删除吗？",
      })
        .then(() => {
          const id = route.params.id;
          http
            .delete(
              `/tags/${id.toString()}`,
              { with_items: options?.withItems ? "true" : "false" },
              { _autoLoading: true },
            )
            .then(() => {
              router.back();
            })
            .catch(() => {
              showDialog({ title: "错误", message: "删除失败" });
            });
        })
        .catch();
    };
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => "编辑标签",
          content: () => (
            <>
              <TagForm />
              <div class={s.actions}>
                <Button class={s.deleteTag} level="danger" onClick={() => onDelete()}>
                  删除标签
                </Button>
                <Button class={s.deleteTagAndRecord} level="danger" onClick={() => onDelete({ withItems: true })}>
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
