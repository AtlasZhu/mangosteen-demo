import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg";
import clock from "../../assets/icons/clock.svg";
import chart from "../../assets/icons/chart.svg";
import cloud from "../../assets/icons/cloud.svg";

export const One = () => (
  <WelcomeLayout>
    {{
      title: () => (
        <h2>
          会挣钱
          <br />
          还会省钱
        </h2>
      ),
      icon: () => <img src={pig} alt="会挣钱"></img>,
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/two">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    }}
  </WelcomeLayout>
);

export const Two = () => (
  <WelcomeLayout>
    {{
      title: () => (
        <h2>
          每日提醒
          <br />
          不会遗漏每一笔账单
        </h2>
      ),
      icon: () => <img src={clock} alt="每日提醒"></img>,
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/three">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    }}
  </WelcomeLayout>
);

export const Three = () => (
  <WelcomeLayout>
    {{
      title: () => (
        <h2>
          数据可视化
          <br />
          收支一目了然
        </h2>
      ),
      icon: () => <img src={chart} alt="数据可视化"></img>,
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/four">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    }}
  </WelcomeLayout>
);

export const Four = () => (
  <WelcomeLayout>
    {{
      title: () => (
        <h2>
          云备份
          <br />
          再也不怕数据丢失
        </h2>
      ),
      icon: () => <img src={cloud} alt="云备份"></img>,
      buttons: () => (
        <>
          <RouterLink to="/start">开启应用</RouterLink>
        </>
      ),
    }}
  </WelcomeLayout>
);
