import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg";
import clock from "../../assets/icons/clock.svg";
import chart from "../../assets/icons/chart.svg";
import cloud from "../../assets/icons/cloud.svg";

type item = {
  iconPath: string;
  title1: string;
  title2: string;
  nextPageUrl: string;
};

const itemToComponent = (item: item) => (
  <WelcomeLayout>
    {{
      icon: () => <img src={item.iconPath} alt={item.title1}></img>,
      title: () => (
        <h2>
          {item.title1}
          <br />
          {item.title2}
        </h2>
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
    iconPath: pig,
    title1: "会挣钱",
    title2: "还会省钱",
    nextPageUrl: "/welcome/2",
  },
  {
    iconPath: clock,
    title1: "每日提醒",
    title2: "不会遗漏每一笔账单",
    nextPageUrl: "/welcome/3",
  },
  {
    iconPath: chart,
    title1: "数据可视化",
    title2: "收支一目了然",
    nextPageUrl: "/welcome/4",
  },
  {
    iconPath: cloud,
    title1: "云备份",
    title2: "再也不怕数据丢失",
    nextPageUrl: "/start",
  },
];

export const First = () => itemToComponent(items[0]);
export const FirstButton = () => getNextPageButton(items[0].nextPageUrl);
First.displayName = "First";
FirstButton.displayName = "FirstButton";

export const Second = () => itemToComponent(items[1]);
export const SecondButton = () => getNextPageButton(items[1].nextPageUrl);
Second.displayName = "Second";
SecondButton.displayName = "SecondButton";

export const Third = () => itemToComponent(items[2]);
export const ThirdButton = () => getNextPageButton(items[2].nextPageUrl);
Third.displayName = "Third";
ThirdButton.displayName = "ThirdButton";

export const Fourth = () => itemToComponent(items[3]);
export const FourthButton = () => getNextPageButton(items[3].nextPageUrl);
Fourth.displayName = "Fourth";
FourthButton.displayName = "FourthButton";
