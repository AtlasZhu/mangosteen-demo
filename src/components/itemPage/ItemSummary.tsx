import { defineComponent } from "vue";
import { RouterLink, useRouter } from "vue-router";
import pig from "../../assets/icons/pig.svg";
import { useAfterMe } from "../../hooks/useAfterMe";
import { Button } from "../../shared/Button";
import { Center } from "../../shared/Center";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { Icon } from "../../shared/Icon";
import { getMoney } from "../../shared/utils";
import { useItemStore } from "../../stores/useItemStore";
import s from "./ItemSummary.module.scss";
export const ItemSummary = defineComponent({
  props: {
    startTime: { type: String },
    endTime: { type: String },
  },
  setup(props, context) {
    const router = useRouter();

    const itemStore = useItemStore(`item-${props.startTime}-${props.endTime}`);

    const loadFirstPage = (startTime?: string, endTime?: string) => {
      itemStore.$reset();
      itemStore.fetchFirstPage(startTime, endTime);
    };
    context.expose({ loadFirstPage });

    useAfterMe(
      () => {
        itemStore.fetchFirstPage(props.startTime, props.endTime);
      },
      () => {
        itemStore.$reset();
      },
    );

    const onClickAddItemButton = () => {
      router.push("/items/create");
    };

    return () => {
      return (
        <div class={s.wrapper}>
          {itemStore.items && itemStore.items.length > 0 ? (
            <>
              <ul class={s.total}>
                <li>
                  <span>收入</span>
                  <span>{getMoney(itemStore.balance.income)}￥</span>
                </li>
                <li>
                  <span>支出</span>
                  <span>{getMoney(itemStore.balance.expenses)}￥</span>
                </li>
                <li>
                  <span>净收入</span>
                  <span>{getMoney(itemStore.balance.balance)}￥</span>
                </li>
              </ul>
              <ul class={s.list}>
                {itemStore.items.map(item => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : "💰"}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : "未分类"}</span>
                        <span class={item.kind === "expenses" ? s.expenses : s.income}>{getMoney(item.amount)}￥</span>
                      </div>
                      <DateTime class={s.time} time={item.happened_at}></DateTime>
                    </div>
                  </li>
                ))}
              </ul>

              <div class={s.more}>
                {itemStore.hasMore ? (
                  <Button class={s.loadMoreButton} onClick={() => itemStore.fetchNextPage()}>
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
                <p>目前没有数据</p>
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
