import { showConfirmDialog } from "vant";
import { defineComponent, onMounted, PropType, reactive } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import svgChart2 from "../assets/icons/chart2.svg";
import svgExport from "../assets/icons/export.svg";
import svgNotify from "../assets/icons/notify.svg";
import { Icon } from "./Icon";
import { mePromise } from "./me";
import s from "./Overlay.module.scss";
export const Overlay = defineComponent({
  props: {
    onClick: { type: Function as PropType<(e: MouseEvent) => void> },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const me = reactive<User>({ email: "" });
    onMounted(() => {
      mePromise
        .then(response => {
          Object.assign(me, response.data.resource);
        })
        .catch(() => {
          console.log("身份信息错误");
        });
    });
    const onSignOut = () => {
      showConfirmDialog({ title: "提示", message: "确定要退出登录吗？" }).then(() => {
        localStorage.removeItem("jwt");
        router.push("/sign_in");
      });
    };
    return () => (
      <>
        <div class={s.mask} onClick={props.onClick}></div>
        <div class={s.overlay}>
          <div class={s.userStatus}>
            {me.email ? (
              <div class={s.userInfo}>
                <h3 class={s.userEmail}>{me.email}</h3>
                <h4 class={s.signOut} onClick={onSignOut}>
                  点击这里注销
                </h4>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.path}`}>
                <h1>未登录用户</h1>点击这里登录
              </RouterLink>
            )}
          </div>
          <nav class={s.navList}>
            <ul>
              <RouterLink to="/start">
                <li>
                  <Icon iconName={svgExport} class={s.icon}></Icon>
                  <span>导出数据</span>
                </li>
              </RouterLink>
              <RouterLink to="/statistics">
                <li>
                  <Icon iconName={svgChart2} class={s.icon}></Icon>
                  <span>统计图表</span>
                </li>
              </RouterLink>
              <RouterLink to="/statistics">
                <li>
                  <Icon iconName={svgNotify} class={s.icon}></Icon>
                  <span>记账提醒</span>
                </li>
              </RouterLink>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
