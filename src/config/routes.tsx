import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { One } from "../components/welcome/One";
import { Two } from "../components/welcome/Two";
import { Three } from "../components/welcome/Three";
import { Four } from "../components/welcome/Four";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", component: One },
      { path: "one", component: One },
      { path: "two", component: Two },
      { path: "three", component: Three },
      { path: "four", component: Four },
    ],
  },
  { path: "/:pathMatch(.*)*", component: Four },
];
