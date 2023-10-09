import { createRouter, RouteRecordRaw } from "vue-router";
import { ItemCreate } from "../components/itemPage/ItemCreate";
import { ItemList } from "../components/itemPage/ItemList";
import { TagsCreate } from "../components/tags/TagsCreate";
import { TagsEdit } from "../components/tags/TagsEdit";
import { First, Fourth, Second, Third } from "../components/welcome/FourItems";
import { history } from "../shared/history";
import { mePromise } from "../shared/me";
import { ItemPage } from "../views/ItemPage";
import { NotFound } from "../views/NotFound";
import { SignInPage } from "../views/SignInPage";
import { Start } from "../views/Start";
import { StatisticsPage } from "../views/StatisiticsPage";
import { TagsPage } from "../views/TagsPage";
import { Welcome } from "../views/Welcome";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome/1" },
  {
    path: "/welcome",
    component: Welcome,
    beforeEnter: (to, enter, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/start") : next();
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
  { path: "/start", component: Start },
  {
    path: "/items",
    component: ItemPage,
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
      { path: "create", component: TagsCreate },
      { path: ":id/edit", component: TagsEdit },
    ],
  },
  { path: "/sign_in", component: SignInPage },
  { path: "/statistics", component: StatisticsPage },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({ history, routes });

const noLoginCheckList = {
  exact: ["/", "/start"],
  startWith: ["/welcome", "/sign_in"],
};
router.beforeEach((to, from) => {
  let noLoginCheck = false;
  noLoginCheckList.startWith.forEach(value => {
    if (to.path.startsWith(value)) noLoginCheck = true;
  });
  if (noLoginCheckList.exact.indexOf(to.path) >= 0) noLoginCheck = true;

  return (
    noLoginCheck ||
    mePromise.then(
      () => true,
      () => "/sign_in?return_to=" + to.path,
    )
  );
});
