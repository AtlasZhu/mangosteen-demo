import axios from "axios";
import { defineComponent, reactive, ref } from "vue";
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
    const checkForm = (checkType: "email" | "all") => {
      Object.assign(errors, { email: [], validationCode: [] });
      if (checkType === "all") {
        Object.assign(
          errors,
          validate(formData, [
            {
              key: "validationCode",
              type: "pattern",
              regex: /^\d{6}$/,
              message: "验证码为六位数字",
            },
          ]),
        );
      }
      Object.assign(
        errors,
        validate(formData, [
          {
            key: "email",
            type: "pattern",
            regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不规范",
          },
        ]),
      );
    };
    const login = () => {
      checkForm("all");
    };
    const sendCode = () => {
      return axios.post("/api/v1/validation_codes", { email: formData.email });
    };

    const count = ref(0);
    const isCounting = ref(false);
    const countInterval = ref<number>();
    const onClickSendCodeButton = () => {
      if (isCounting.value) return;
      checkForm("email");
      if (errors.email.length > 0) return;

      sendCode().then(res => {
        console.log(res);

        count.value = 3;
        isCounting.value = true;
        countInterval.value = setInterval(() => {
          count.value--;
          if (count.value <= 0) {
            clearInterval(countInterval.value);
            countInterval.value = undefined;
            isCounting.value = false;
          }
        }, 1000);
      });
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
                  <input v-model={formData.validationCode} placeholder="输入验证码"></input>
                  <Button
                    disabled={isCounting.value}
                    class={s.validationCodeSendButton}
                    onClick={onClickSendCodeButton}>
                    {isCounting.value ? <span>{count.value}秒后可重新发送</span> : <span> 发送验证码</span>}
                  </Button>
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
