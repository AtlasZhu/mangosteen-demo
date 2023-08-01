import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg";
import clock from "../../assets/icons/clock.svg";
import chart from "../../assets/icons/chart.svg";
import cloud from "../../assets/icons/cloud.svg";

type item = {
  title1: string;
  title2: string;
  iconPath: string;
  buttons: JSX.Element;
};

const itemToComponent = (item: item) => (
  <WelcomeLayout>
    {{
      title: () => (
        <h2>
          {item.title1}
          <br />
          {item.title2}
        </h2>
      ),
      icon: () => <img src={item.iconPath} alt={item.title1}></img>,
      buttons: () => item.buttons,
    }}
  </WelcomeLayout>
);

const getNextPageButton = (nextPageUrl: string) => {
  if (nextPageUrl !== "/start") {
    return (
      <>
        <RouterLink class={s.fake} to="/start">
          跳过
        </RouterLink>
        <RouterLink to={nextPageUrl}>下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    );
  } else {
    return <RouterLink to="/start">开启应用</RouterLink>;
  }
};

const items: item[] = [
  {
    title1: "会挣钱",
    title2: "还会省钱",
    iconPath: pig,
    buttons: getNextPageButton("/welcome/two"),
  },
  {
    title1: "每日提醒",
    title2: "不会遗漏每一笔账单",
    iconPath: clock,
    buttons: getNextPageButton("/welcome/three"),
  },
  {
    title1: "数据可视化",
    title2: "收支一目了然",
    iconPath: chart,
    buttons: getNextPageButton("/welcome/four"),
  },
  {
    title1: "云备份",
    title2: "再也不怕数据丢失",
    iconPath: cloud,
    buttons: <RouterLink to="/start">开启应用</RouterLink>,
  },
];

export const One = () => itemToComponent(items[0]);
export const Two = () => itemToComponent(items[1]);
export const Three = () => itemToComponent(items[2]);
export const Four = () => itemToComponent(items[3]);
