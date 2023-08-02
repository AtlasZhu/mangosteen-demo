import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import {
  First,
  FirstButton,
  Second,
  SecondButton,
  Third,
  ThirdButton,
  Fourth,
  FourthButton,
} from "../components/welcome/FourItems";
import { NotFound } from "../views/NotFound";
import { Start } from "../views/Start";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/1" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      { path: "1", components: { main: First, footer: FirstButton } },
      { path: "2", components: { main: Second, footer: SecondButton } },
      { path: "3", components: { main: Third, footer: ThirdButton } },
      { path: "4", components: { main: Fourth, footer: FourthButton } },
    ],
  },
  { path: "/start", component: Start },

  { path: "/:pathMatch(.*)*", component: NotFound },
];
