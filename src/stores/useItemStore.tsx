import { defineStore } from "pinia";
import { http } from "../shared/Http";
import { useMeStore } from "./useMeStore";

type State = {
  items: Item[];
  page: number;
  hasMore: boolean;
  balance: { expenses: number; income: number; balance: number };
};

type Actions = { fetchItems: (startTime?: string, endTime?: string) => Promise<void> };

export const useItemStore = (id: string) =>
  defineStore<string, State, {}, Actions>(id, {
    state: () => ({
      items: [],
      page: 0,
      hasMore: false,
      balance: { expenses: 0, income: 0, balance: 0 },
    }),
    actions: {
      async fetchItems(startTime?: string, endTime?: string) {
        console.log(startTime, endTime);
        if (!startTime || !endTime) return;

        const meStore = useMeStore();
        await meStore.mePromise;

        const requestForm = {
          happen_after: startTime,
          happen_before: endTime,
          page: this.page + 1,
        };

        if (requestForm.page === 1) {
          http.get("/items/balance", requestForm).then(response => {
            Object.assign(this.balance, response.data);
          });
        }

        http.get<Resources<Item>>("/items", requestForm, { _autoLoading: true }).then(response => {
          const { resources, pager } = response.data;
          this.items.push(...resources);
          this.page++;
          this.hasMore = this.items.length < pager.count;
        });
      },
    },
  })();
