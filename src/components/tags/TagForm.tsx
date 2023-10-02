import { defineComponent, reactive } from "vue";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, validate } from "../../shared/validate";
import s from "./TagForm.module.scss";

export const TagForm = defineComponent({
  setup() {
    const formData = reactive({ name: "", sign: "" });
    const rules: Rules<typeof formData> = [
      { key: "name", type: "required", message: "必填" },
      { key: "name", type: "pattern", regex: /^.{1,18}$/, message: "限制1到18个字符之间" },
      { key: "sign", type: "required", message: "必填" },
    ];
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({}); //errors的key必存在于formData的key中
    const onFormSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, { name: undefined, sign: undefined }); //清空上次校验后，可能残留的errors
      Object.assign(errors, validate(formData, rules));
    };
    return () => (
      <form class={s.form} onSubmit={onFormSubmit}>
        <div class={s.tagNameWrapper}>
          <span>标签名</span>
          <input v-model={formData.name} />
          <span class={s.error}>{errors["name"] ? errors["name"] : "　"}</span>
        </div>
        <div class={s.tagEmojiWrapper}>
          <span class={s.tagEmojiTitle}>符号: </span>
          <span>{formData.sign}</span>
          <EmojiSelect v-model={formData.sign} />
          <span class={s.emojiErrorText}>{errors["sign"] ? errors["sign"] : "　"}</span>
        </div>
        <div class={s.emojiTips}>
          <p>长按标签即可进行编辑</p>
        </div>
        <div class={s.buttonWrapper}>
          <Button class={s.button}>确定</Button>
        </div>
      </form>
    );
  },
});
