import { RouteRecordRaw } from "vue-router";
import { Foo } from "../views/Foo";
import { Bar } from "../views/Bar";
import { Welcome } from "../views/Welcome";
import { One } from "../components/welcome/one";
import { Two } from "../components/welcome/two";
import { Three } from "../components/welcome/three";
import { Four } from "../components/welcome/four";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/about", component: Bar },
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
];
