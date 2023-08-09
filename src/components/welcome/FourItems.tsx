import { WelcomeLayout } from "./WelcomeLayout";

import chart from "../../assets/icons/chart.svg";
import clock from "../../assets/icons/clock.svg";
import cloud from "../../assets/icons/cloud.svg";
import pig from "../../assets/icons/pig.svg";
import { Icon } from "../../shared/Icon";

type item = {
  iconId: string;
  title1: string;
  title2: string;
};

const itemToComponent = (item: item) => (
  <WelcomeLayout>
    {{
      icon: () => <Icon iconName={item.iconId}></Icon>,
      title: () => (
        <>
          <h2>{item.title1}</h2>
          <h2>{item.title2}</h2>
        </>
      ),
    }}
  </WelcomeLayout>
);

const items: item[] = [
  {
    iconId: pig,
    title1: "会挣钱",
    title2: "还会省钱",
  },
  {
    iconId: clock,
    title1: "每日提醒",
    title2: "不会遗漏每一笔账单",
  },
  {
    iconId: chart,
    title1: "数据可视化",
    title2: "收支一目了然",
  },
  {
    iconId: cloud,
    title1: "云备份",
    title2: "再也不怕数据丢失",
  },
];

export const First = () => itemToComponent(items[0]);
First.displayName = "First";

export const Second = () => itemToComponent(items[1]);
Second.displayName = "Second";

export const Third = () => itemToComponent(items[2]);
Third.displayName = "Third";

export const Fourth = () => itemToComponent(items[3]);
Fourth.displayName = "Fourth";
