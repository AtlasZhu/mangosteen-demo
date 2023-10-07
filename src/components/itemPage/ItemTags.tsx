import { PropType, defineComponent, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import svgPlus from "../../assets/icons/plus.svg";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import s from "./ItemTags.module.scss";
export const ItemTags = defineComponent({
  props: { kind: { type: String as PropType<"expenses" | "income">, required: true } },
  setup(props) {
    type Tag = { id: number; name: string; sign: string; kind: "expenses" | "income" };

    const refTags = ref<Tag[]>([]);
    const tagsInfo = reactive({ page: 0, hasMore: false });

    type Resources<T> = { resources: T[]; pager: { page: number; per_page: number; count: number } };
    const loadMore = () => {
      http.get<Resources<Tag>>("/tags", { kind: props.kind, page: tagsInfo.page + 1 }).then(response => {
        const { resources, pager } = response.data;
        refTags.value.push(...resources);
        tagsInfo.page++;
        tagsInfo.hasMore = refTags.value.length < pager.count;
      });
    };
    onMounted(loadMore);

    return () => (
      <div class={s.tag_wrapper}>
        <ul>
          <li>
            <div class={s.addTag}>
              <RouterLink to={"/tags/create"}>
                <Icon iconName={svgPlus}></Icon>
              </RouterLink>
            </div>
            <div>{"增加"}</div>
          </li>
          {refTags.value.map(tag => (
            <li>
              <div class={s.sign}>{tag.sign}</div>
              <span class={s.name}>{tag.name}</span>
            </li>
          ))}
        </ul>

        <div class={s.loadMore_wrapper}>
          {tagsInfo.hasMore ? (
            <Button class={s.loadMore} onClick={loadMore}>
              加载下一页
            </Button>
          ) : (
            <span>没有更多的了</span>
          )}
        </div>
      </div>
    );
  },
});
