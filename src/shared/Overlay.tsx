import { showConfirmDialog } from "vant";
import { defineComponent, onMounted, PropType, reactive } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import svgBook from "../assets/icons/book.svg";
import svgChart2 from "../assets/icons/chart2.svg";
import svgExport from "../assets/icons/export.svg";
import svgList from "../assets/icons/list.svg";
import svgNotify from "../assets/icons/notify.svg";
import { useMeStore } from "../stores/useMeStore";
import { Icon } from "./Icon";
import s from "./Overlay.module.scss";
export const Overlay = defineComponent({
  props: {
    onClick: { type: Function as PropType<(e: MouseEvent) => void> },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const meStore = useMeStore();
    const me = reactive<User>({ email: "" });
    onMounted(async () => {
      try {
        await meStore.mePromise;
        Object.assign(me, meStore.me);
      } catch (e) {
        console.log("还未登录");
      }
    });
    const onSignOut = () => {
      showConfirmDialog({ title: "提示", message: "确定要退出登录吗？" }).then(() => {
        localStorage.removeItem("jwt");
        // meStore.refreshMe();
        // router.push("/sign_in");
        window.location.reload();
      });
    };
    return () => (
      <div class={s.wrapper}>
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
              <RouterLink to="/items/list" activeClass={s["router-link-active"]}>
                <li>
                  <Icon iconName={svgList} class={s.icon}></Icon>
                  <span>查看账目</span>
                </li>
              </RouterLink>

              <RouterLink to="/items/create" activeClass={s["router-link-active"]}>
                <li>
                  <Icon iconName={svgBook} class={s.icon}></Icon>
                  <span>开始记账</span>
                </li>
              </RouterLink>

              <RouterLink to="/statistics" activeClass={s["router-link-active"]}>
                <li>
                  <Icon iconName={svgChart2} class={s.icon}></Icon>
                  <span>统计图表</span>
                </li>
              </RouterLink>

              <RouterLink to="/export" activeClass={s["router-link-active"]}>
                <li>
                  <Icon iconName={svgNotify} class={s.icon}></Icon>
                  <span>记账提醒</span>
                </li>
              </RouterLink>

              <RouterLink to="/notify" activeClass={s["router-link-active"]}>
                <li>
                  <Icon iconName={svgExport} class={s.icon}></Icon>
                  <span>导出数据</span>
                </li>
              </RouterLink>
            </ul>
          </nav>
        </div>
      </div>
    );
  },
});
