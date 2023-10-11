import { defineComponent, onMounted, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import pig from "../../assets/icons/pig.svg";
import { Button } from "../../shared/Button";
import { Center } from "../../shared/Center";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { getMoney } from "../../shared/utils";
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

    const loadMore = (startTime?: string, endTime?: string) => {
      console.log(startTime, endTime);

      if (!startTime || !endTime) {
        startTime = props.startTime;
        endTime = props.endTime;
      }

      if (!startTime || !endTime) return;

      const requestForm = {
        happen_after: startTime,
        happen_before: endTime,
        page: itemsInfo.page + 1,
      };
      console.log(requestForm);

      if (itemsInfo.page === 0) {
        http.get("/items/balance", requestForm).then(response => {
          Object.assign(itemsBalance, response.data);
        });
      }

      http.get<Resources<Item>>("/items", requestForm, { _autoLoading: true }).then(response => {
        const { resources, pager } = response.data;
        itemsInfo.items.push(...resources);
        itemsInfo.page++;
        itemsInfo.hasMore = itemsInfo.items.length < pager.count;
      });
    };

    const loadFirstPage = (startTime?: string, endTime?: string) => {
      itemsInfo.items = [];
      itemsInfo.page = 0;
      itemsInfo.hasMore = false;
      loadMore(startTime, endTime);
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
          {itemsInfo.items && itemsInfo.items.length > 0 ? (
            <>
              <ul class={s.total}>
                <li>
                  <span>收入</span>
                  <span>{getMoney(itemsBalance.income)}￥</span>
                </li>
                <li>
                  <span>支出</span>
                  <span>{getMoney(itemsBalance.expenses)}￥</span>
                </li>
                <li>
                  <span>净收入</span>
                  <span>{getMoney(itemsBalance.balance)}￥</span>
                </li>
              </ul>
              <ul class={s.list}>
                {itemsInfo.items.map(item => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags[0].sign}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span class={s.tag}>{item.tags[0].name}</span>
                        <span class={s.amount}>{getMoney(item.amount)}￥</span>
                      </div>
                      <DateTime class={s.time} time={item.happen_at}></DateTime>
                    </div>
                  </li>
                ))}
              </ul>

              <div class={s.more}>
                {itemsInfo.hasMore ? (
                  <Button class={s.loadMoreButton} onClick={() => loadMore()}>
                    加载更多
                  </Button>
                ) : (
                  <span>没有更多</span>
                )}
              </div>
            </>
          ) : (
            <>
              <Center class={s.pig_wrapper}>
                <Icon iconName={pig} class={s.pig}></Icon>
              </Center>
              <RouterLink to="/items/create">
                <div class={s.button_wrapper}>
                  <Button class={s.button}>开始记账</Button>
                </div>
              </RouterLink>
            </>
          )}
          <FloatButton onClick={onClickAddItemButton} />
        </div>
      );
    };
  },
});
