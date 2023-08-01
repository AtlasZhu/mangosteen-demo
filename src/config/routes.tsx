import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { One } from "../components/welcome/One";
import { Two } from "../components/welcome/Two";
import { Three } from "../components/welcome/Three";
import { Four } from "../components/welcome/Four";
import { NotFound } from "../views/NotFound";
import { Start } from "../views/Start";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/one" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/one" },
      { path: "one", component: One },
      { path: "two", component: Two },
      { path: "three", component: Three },
      { path: "four", component: Four },
    ],
  },
  { path: "/start", component: Start },

  { path: "/:pathMatch(.*)*", component: NotFound },
];
