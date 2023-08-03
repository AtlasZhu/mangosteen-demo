import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
import s from "./WelcomeLayout.module.scss";

import pig from "../../assets/icons/pig.svg";
import clock from "../../assets/icons/clock.svg";
import chart from "../../assets/icons/chart.svg";
import cloud from "../../assets/icons/cloud.svg";

type item = {
  iconId: string;
  title1: string;
  title2: string;
  nextPageUrl: string;
};

const itemToComponent = (item: item) => (
  <WelcomeLayout>
    {{
      icon: () => (
        <svg>
          <use xlinkHref={`#${item.iconId}`} />
        </svg>
      ),
      title: () => (
        <>
          <h2>{item.title1}</h2>
          <h2>{item.title2}</h2>
        </>
      ),
    }}
  </WelcomeLayout>
);

const getNextPageButton = (nextPageUrl: string) => {
  if (nextPageUrl !== "/start") {
    return (
      <div class={s.actions}>
        <RouterLink class={s.fake} to="/start">
          跳过
        </RouterLink>
        <RouterLink to={nextPageUrl}>下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </div>
    );
  } else {
    return (
      <div class={s.actions}>
        <RouterLink to="/start">开启应用</RouterLink>
      </div>
    );
  }
};

const items: item[] = [
  {
    iconId: pig,
    title1: "会挣钱",
    title2: "还会省钱",
    nextPageUrl: "/welcome/2",
  },
  {
    iconId: clock,
    title1: "每日提醒",
    title2: "不会遗漏每一笔账单",
    nextPageUrl: "/welcome/3",
  },
  {
    iconId: chart,
    title1: "数据可视化",
    title2: "收支一目了然",
    nextPageUrl: "/welcome/4",
  },
  {
    iconId: cloud,
    title1: "云备份",
    title2: "再也不怕数据丢失",
    nextPageUrl: "/start",
  },
];

export const First = () => itemToComponent(items[0]);
export const FirstActions = () => getNextPageButton(items[0].nextPageUrl);
First.displayName = "First";
FirstActions.displayName = "FirstButton";

export const Second = () => itemToComponent(items[1]);
export const SecondActions = () => getNextPageButton(items[1].nextPageUrl);
Second.displayName = "Second";
SecondActions.displayName = "SecondButton";

export const Third = () => itemToComponent(items[2]);
export const ThirdActions = () => getNextPageButton(items[2].nextPageUrl);
Third.displayName = "Third";
ThirdActions.displayName = "ThirdButton";

export const Fourth = () => itemToComponent(items[3]);
export const FourthActions = () => getNextPageButton(items[3].nextPageUrl);
Fourth.displayName = "Fourth";
FourthActions.displayName = "FourthButton";
