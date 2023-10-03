import { defineComponent, reactive } from "vue";
import svgBack from "../assets/icons/back.svg";
import svgPineapple from "../assets/icons/pineapple.svg";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  setup() {
    const formData = reactive({ email: "", validationCode: "" });
    const errors = reactive({ email: [], validationCode: [] });
    const login = () => {
      console.log(11);

      Object.assign(errors, { email: [], validationCode: [] });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "pattern", regex: /^.+@.+\..+$/, message: "邮箱格式不规范" },
          {
            key: "validationCode",
            type: "pattern",
            regex: /^\d{6}$/,
            message: "验证码为六位数字",
          },
        ]),
      );
    };
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgBack}></Icon>,
          title: () => "登录",
          content: () => (
            <div class={s.signInWrapper}>
              <Icon iconName={svgPineapple} class={s.svg}></Icon>
              <p>菠萝账本</p>
              <label class={s.email}>
                邮箱<input v-model={formData.email}></input>
                <p>{errors.email[0] ?? "　"}</p>
              </label>
              <label class={s.validationCodeWrapper}>
                验证码
                <div class={s.validationCode}>
                  <input v-model={formData.validationCode}></input>
                  <Button class={s.validationCodeSendButton}>发送验证码</Button>
                </div>
                <p>{errors.validationCode[0] ?? "　"}</p>
              </label>
              <Button class={s.loginButton} onClick={login}>
                登录
              </Button>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
