/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type Tag = { id: number; name: string; sign: string; kind: "expenses" | "income" };
type Resources<T> = { resources: T[]; pager: { page: number; per_page: number; count: number } };
type Item = {
  kind: "expenses" | "expenses";
  tags_id: number[];
  happen_at: string;
  amount: number;
  tags: Tag[];
};

type User = { email: string };
