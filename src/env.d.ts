/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type Tag = { id: number; user_id: number; name: string; sign: string; kind: "expenses" | "income" };

type Resources<T> = { resources: T[]; pager: { page: number; per_page: number; count: number } };

type Resource<T> = {
  resource: T;
};

type Item = {
  id: number;
  user_id: number;
  amount: number;
  tag_ids: number[];
  tags: Tag[];
  happened_at: string;
  kind: "expenses" | "income";
};

type User = { id?: number; email: string };

type FormErrors<T> = { [k in keyof typeof T]: string[] };

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
