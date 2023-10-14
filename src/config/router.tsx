import { createRouter, RouteRecordRaw } from "vue-router";
import { ItemCreate } from "../components/itemPage/ItemCreate";
import { ItemList } from "../components/itemPage/ItemList";
import { First, Fourth, Second, Third } from "../components/welcome/FourItems";
import { history } from "../shared/history";
import { TagsPage } from "../views/TagsPage";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/1" },
  {
    path: "/welcome",
    component: () => import("../views/Welcome"),
    beforeEnter: (to, enter, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/items") : next();
    },
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
  {
    path: "/items",
    component: () => import("../views/ItemPage"),
    children: [
      { path: "", redirect: "/items/list" },
      { path: "create", component: ItemCreate },
      { path: "list", component: ItemList },
    ],
  },
  {
    path: "/tags",
    component: TagsPage,
    children: [
      { path: "", redirect: "/tags/create" },
      { path: "create", component: () => import("../components/tags/TagsCreate") },
      { path: ":id/edit", component: () => import("../components/tags/TagsEdit") },
    ],
  },
  { path: "/sign_in", component: () => import("../views/SignInPage") },
  { path: "/statistics", component: () => import("../views/StatisiticsPage") },
  { path: "/export", component: () => import("../shared/ComingSoon") },
  { path: "/notify", component: () => import("../shared/ComingSoon") },
  { path: "/:pathMatch(.*)*", component: () => import("../views/NotFound") },
];

export const router = createRouter({ history, routes });
