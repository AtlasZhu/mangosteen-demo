import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
import { Money } from "../../shared/Money";
import s from "./ItemSummary.module.scss";
export const ItemSummary = defineComponent({
  props: {
    startTime: { type: String },
    endTime: { type: String },
  },
  setup(props, context) {
    const router = useRouter();

    const itemsInfo = reactive<{ items: Item[]; page: number; hasMore: boolean }>({
      items: [],
      page: 0,
      hasMore: false,
    });
    const itemsBalance = reactive({ expenses: 0, income: 0, balance: 0 });

    const loadMore = () => {
      if (!props.startTime || !props.endTime) return;
      const requestForm = {
        happen_after: props.startTime,
        happen_before: props.endTime,
        page: itemsInfo.page + 1,
      };
      console.log(requestForm);

      if (itemsInfo.page === 0) {
        http.get("/items/balance", requestForm).then(response => {
          Object.assign(itemsBalance, response.data);
        });
      }

      http.get<Resources<Item>>("/items", requestForm).then(response => {
        const { resources, pager } = response.data;
        itemsInfo.items.push(...resources);
        itemsInfo.page++;
        itemsInfo.hasMore = itemsInfo.items.length < pager.count;
      });
    };

    const loadFirstPage = () => {
      itemsInfo.items = [];
      itemsInfo.page = 0;
      itemsInfo.hasMore = false;
      loadMore();
      console.log(JSON.stringify(itemsInfo));
    };
    context.expose({ loadFirstPage });

    onMounted(loadMore);

    const onClickAddItemButton = () => {
      router.push("/items/create");
    };

    return () => {
      return (
        <div class={s.wrapper}>
          <ul class={s.total}>
            <li>
              <span>收入</span>
              <span>{itemsBalance.income}</span>
            </li>
            <li>
              <span>支出</span>
              <span>{itemsBalance.expenses}</span>
            </li>
            <li>
              <span>净收入</span>
              <span>{itemsBalance.balance}</span>
            </li>
          </ul>
          <ul class={s.list}>
            {itemsInfo.items.map(item => (
              <li>
                <div class={s.sign}>
                  <span>{item.tags_id[0]}</span>
                </div>
                <div class={s.text}>
                  <div class={s.tagAndAmount}>
                    <span class={s.tag}>{item.tags_id[0]}</span>
                    <Money class={s.amount} amount={item.amount}></Money>
                  </div>
                  <DateTime class={s.time} time={item.happen_at}></DateTime>
                </div>
              </li>
            ))}
          </ul>

          <div class={s.more}>
            {itemsInfo.hasMore ? (
              <Button class={s.loadMoreButton} onClick={loadMore}>
                加载更多
              </Button>
            ) : (
              <span>没有更多</span>
            )}
          </div>
          <FloatButton onClick={onClickAddItemButton} />
        </div>
      );
    };
  },
});
