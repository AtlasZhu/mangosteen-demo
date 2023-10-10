import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
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
    const loadMore = () => {
      if (!props.startTime || !props.endTime) return;
      const requestForm = {
        happen_after: props.startTime,
        happen_before: props.endTime,
        page: itemsInfo.page + 1,
      };
      console.log(requestForm);
      http.get<Resources<Item>>("/items", requestForm).then(response => {
        const { resources, pager } = response.data;
        itemsInfo.items.push(...resources);
        itemsInfo.page++;
        itemsInfo.hasMore = itemsInfo.items.length < pager.count;
      });
    };
    onMounted(loadMore);
    const loadFirstPage = () => {
      itemsInfo.items = [];
      itemsInfo.page = 0;
      itemsInfo.hasMore = false;
      loadMore();
      console.log(JSON.stringify(itemsInfo));
    };
    context.expose({ loadFirstPage });

    const onClickAddItemButton = () => {
      router.push("/items/create");
    };

    return () => {
      return (
        <div class={s.wrapper}>
          <ul class={s.total}>
            <li>
              <span>收入</span>
              <span>128</span>
            </li>
            <li>
              <span>支出</span>
              <span>99</span>
            </li>
            <li>
              <span>净收入</span>
              <span>29</span>
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
                    <span class={s.amount}>{item.happen_at}</span>
                  </div>
                  <div class={s.time}>{item.happen_at}</div>
                </div>
              </li>
            ))}

            <li>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>2000-01-01 12:39</div>
              </div>
            </li>
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
