import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import svgPineapple from "../assets/icons/pineapple.svg";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { http } from "../shared/Http";
import { Icon } from "../shared/Icon";
import { refreshMe } from "../shared/me";
import { assignErrors, hasError, onAxiosError, validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
import { BackIcon } from "../shared/BackIcon";
export const SignInPage = defineComponent({
  setup() {
    const formData = reactive({ email: "", validationCode: "" });
    const errors = reactive({ email: [], validationCode: [] });
    const checkForm = (checkType: "email" | "all") => {
      if (checkType === "all") {
        assignErrors(
          errors,
          validate(formData, [
            { key: "validationCode", type: "required", message: "必填" },
            {
              key: "validationCode",
              type: "pattern",
              regex: /^\d{6}$/,
              message: "验证码为六位数字",
            },
          ]),
        );
      }
      assignErrors(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不规范",
          },
        ]),
      );
    };

    const sendCode = () => {
      return http.post("/validation_codes", { email: formData.email });
    };
    const onResponseError = (error: any) => {
      onAxiosError(error, 422, (data: any) => {
        assignErrors(errors, data.errors);
      });
    };
    const count = ref(0);
    const isCounting = ref(false);
    const countInterval = ref<number>();
    const buttonDisabled = ref(false);
    const onClickSendCodeButton = () => {
      if (isCounting.value) return;
      checkForm("email");
      if (hasError(errors)) return;
      buttonDisabled.value = true;
      sendCode()
        .then(() => {
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
        })
        .catch(onResponseError)
        .finally(() => {
          buttonDisabled.value = false;
        });
    };
    const router = useRouter();
    const route = useRoute();
    const login = () => {
      checkForm("all");
      if (hasError(errors)) return;
      http
        .post<{ jwt: string }>("/session", formData)
        .then(response => {
          localStorage.setItem("jwt", response.data.jwt);
          const returnTo = route.query.return_to?.toString();
          refreshMe()
            .then(() => router.push(returnTo || "/"))
            .catch(() => alert("身份信息异常"));
        })
        .catch(onResponseError);
    };

    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
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
                    disabled={isCounting.value || buttonDisabled.value}
                    class={s.validationCodeSendButton}
                    onClick={onClickSendCodeButton}>
                    {isCounting.value ? <span>已发送，{count.value}秒后可重发</span> : <span> 发送验证码</span>}
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
