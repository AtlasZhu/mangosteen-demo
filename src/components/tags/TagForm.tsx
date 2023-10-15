import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { http } from "../../shared/Http";
import { Rules, assignErrors, hasError, onAxiosError, validate } from "../../shared/validate";
import s from "./TagForm.module.scss";

export const TagForm = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const kind = route.query.kind;
    if (!kind) return () => <div>参数错误</div>;

    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: "",
      sign: "",
      kind: kind.toString() as "expenses" | "income",
    });
    const rules: Rules<typeof formData> = [
      { key: "name", type: "required", message: "必填" },
      { key: "name", type: "pattern", regex: /^.{1,4}$/, message: "限制1到4个字符之间" },
      { key: "sign", type: "required", message: "必填" },
    ];

    onMounted(() => {
      const id = route.params.id;
      if (id) {
        //如果id存在，说明是要更新一个tag
        formData.id = parseInt(id.toString());
        http
          .get<{ resource: Tag }>(`/tags/${formData.id}`)
          .then(response => {
            Object.assign(formData, response.data.resource);
          })
          .catch(error => {
            onAxiosError(
              error,
              422,
              (data: any) => {
                console.log(JSON.stringify(data));
              },
              false,
            );
          });
      }
    });
    const errors = reactive<FormErrors<typeof formData>>({}); //errors的key必存在于formData的key中
    const onFormSubmit = async (e: Event) => {
      e.preventDefault();
      assignErrors(errors, validate(formData, rules));
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? http.patch(`/tags/${formData.id}`, formData, { _autoLoading: true })
          : http.post("/tags", formData, { _autoLoading: true });
        await promise
          .then(() => {
            router.push(`/items/create?kind=${kind}`);
          })
          .catch(error => {
            onAxiosError(error, 422, (errorData: any) => assignErrors(errors, errorData.errors), false);
          });
      }
    };
    return () => (
      <form class={s.form} onSubmit={onFormSubmit}>
        <div class={s.tagNameWrapper}>
          <span>标签名：（最多4个字）</span>
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
