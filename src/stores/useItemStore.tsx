import { defineStore } from "pinia";
import { http } from "../shared/Http";
import { Time } from "../shared/time";
import { useMeStore } from "./useMeStore";

type State = {
  items: Item[];
  page: number;
  hasMore: boolean;
  balance: { expenses: number; income: number; balance: number };
  startTime?: string;
  endTime?: string;
};

type Actions = {
  fetchFirstPage: (startTime?: string, endTime?: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
};

const fetchItems = async function (this: State, page: number) {
  if (!this.startTime || !this.endTime) return;
  const requestForm = {
    happen_after: this.startTime,
    happen_before: new Time(this.endTime).add(1, "day").formatAsString(),
    page: page,
  };

  if (requestForm.page === 1) {
    http.get("/items/balance", requestForm).then(response => {
      Object.assign(this.balance, response.data);
    });
  }

  await http.get<Resources<Item>>("/items", requestForm, { _autoLoading: true }).then(response => {
    const { resources, pager } = response.data;
    if (page === 1) {
      this.items = resources;
    } else {
      this.items.push(...resources);
    }
    this.hasMore = this.items.length < pager.count;
  });
};

export const useItemStore = (id: string) =>
  defineStore<string, State, {}, Actions>(id, {
    state: () => ({
      items: [],
      page: 0,
      hasMore: false,
      balance: { expenses: 0, income: 0, balance: 0 },
      startTime: undefined,
      endTime: undefined,
    }),
    actions: {
      async fetchFirstPage(startTime?: string, endTime?: string) {
        console.log(startTime, endTime);
        if (!startTime || !endTime) return;

        const meStore = useMeStore();
        await meStore.mePromise;
        this.startTime = startTime;
        this.endTime = endTime;
        fetchItems.call(this, 1).then(() => {
          this.page = 1;
        });
      },

      async fetchNextPage() {
        if (!this.hasMore) return;
        fetchItems.call(this, this.page + 1).then(() => {
          this.page++;
        });
      },
    },
  })();
