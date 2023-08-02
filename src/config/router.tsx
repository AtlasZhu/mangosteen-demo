import { RouteRecordRaw } from "vue-router";
import { createRouter } from "vue-router";
import { history } from "../shared/history";
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

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/1" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        components: { main: First, footer: FirstButton },
        meta: { customData: { page: "Welcome", depth: 1 } },
      },
      {
        path: "2",
        components: { main: Second, footer: SecondButton },
        meta: { customData: { page: "Welcome", depth: 2 } },
      },
      {
        path: "3",
        components: { main: Third, footer: ThirdButton },
        meta: { customData: { page: "Welcome", depth: 3 } },
      },
      {
        path: "4",
        components: { main: Fourth, footer: FourthButton },
        meta: { customData: { page: "Welcome", depth: 4 } },
      },
    ],
  },
  { path: "/start", component: Start },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({ history, routes });
