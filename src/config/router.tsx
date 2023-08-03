import { RouteRecordRaw, createRouter } from "vue-router";
import { First, Fourth, Second, Third } from "../components/welcome/FourItems";
import { history } from "../shared/history";
import { NotFound } from "../views/NotFound";
import { Start } from "../views/Start";
import { Welcome } from "../views/Welcome";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/1" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        component: First,
      },
      {
        path: "2",
        component: Second,
      },
      {
        path: "3",
        component: Third,
      },
      {
        path: "4",
        component: Fourth,
      },
    ],
  },
  { path: "/start", component: Start },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({ history, routes });
