import { RouteRecordRaw } from "vue-router";
import { createRouter } from "vue-router";
import { history } from "../shared/history";
import { Welcome } from "../views/Welcome";
import {
  First,
  FirstActions,
  Second,
  SecondActions,
  Third,
  ThirdActions,
  Fourth,
  FourthActions,
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
        components: { main: First, footer: FirstActions },
        meta: { customData: { page: "Welcome", depth: 1 } },
      },
      {
        path: "2",
        components: { main: Second, footer: SecondActions },
        meta: { customData: { page: "Welcome", depth: 2 } },
      },
      {
        path: "3",
        components: { main: Third, footer: ThirdActions },
        meta: { customData: { page: "Welcome", depth: 3 } },
      },
      {
        path: "4",
        components: { main: Fourth, footer: FourthActions },
        meta: { customData: { page: "Welcome", depth: 4 } },
      },
    ],
  },
  { path: "/start", component: Start },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({ history, routes });
