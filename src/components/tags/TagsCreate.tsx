import { defineComponent, reactive } from "vue";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Icon } from "../../shared/Icon";
import s from "./TagsCreate.module.scss";
export const TagsCreate = defineComponent({
  setup() {
    const formData = reactive({ name: "", sign: "" });
    const onFormSubmit = (e: Event) => {
      e.preventDefault();
    };
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgBack} />,
          title: () => "新建标签",
          content: () => (
            <form class={s.form} onSubmit={onFormSubmit}>
              <div class={s.tagNameWrapper}>
                <span>标签名</span>
                <input v-model={formData.name} />
                <input v-model={formData.name} />
                <span class={s.error}>必填</span>
              </div>
              <div class={s.tagEmojiWrapper}>
                <span class={s.tagEmojiTitle}>符号: </span>
                <span>{formData.sign}</span>
                <EmojiSelect v-model={formData.sign} />
                <span class={s.emojiErrorText}>必填</span>
              </div>
              <div class={s.emojiTips}>
                <p>记账时长按标签即可进行编辑</p>
              </div>
              <div class={s.buttonWrapper}>
                <Button class={s.button}>确定</Button>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
