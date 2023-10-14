import { PropType, defineComponent, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import svgPlus from "../../assets/icons/plus.svg";
import { useAfterMe } from "../../hooks/useAfterMe";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import s from "./ItemTags.module.scss";
export const ItemTags = defineComponent({
  props: { kind: { type: String as PropType<"expenses" | "income">, required: true }, selected: { type: Number } },
  emits: ["update:selected"],
  setup(props, context) {
    const refTags = ref<Tag[]>([]);
    const tagsInfo = reactive({ page: 0, hasMore: false });

    const loadMore = () => {
      http
        .get<Resources<Tag>>("/tags", { kind: props.kind, page: tagsInfo.page + 1 }, { _autoLoading: true })
        .then(response => {
          const { resources, pager } = response.data;
          refTags.value.push(...resources);
          tagsInfo.page++;
          tagsInfo.hasMore = refTags.value.length < pager.count;
        });
    };
    useAfterMe(loadMore);
    const onTagSelect = (id: number) => {
      context.emit("update:selected", id);
    };

    let timer: number;
    let currentTarget: HTMLDivElement;
    let targetY: number;
    const router = useRouter();
    const onTouchStart = (e: TouchEvent, tagId: number) => {
      currentTarget = e.currentTarget as HTMLDivElement;
      targetY = e.touches[0].clientY;
      timer = setTimeout(() => {
        clearTimeout(timer);
        router.push(`/tags/${tagId}/edit?kind=${props.kind}`);
      }, 1000);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer);
    };
    const onTouchMove = (e: TouchEvent) => {
      const newY = e.touches[0].clientY;
      const pointElement = document.elementFromPoint(e.touches[0].clientX, newY);

      if ((pointElement !== currentTarget && !currentTarget?.contains(pointElement)) || Math.abs(targetY - newY) > 12) {
        clearTimeout(timer);
      }
    };

    return () => (
      <div class={s.tag_wrapper} onTouchmove={onTouchMove}>
        <ul>
          <li>
            <div class={s.addTag}>
              <RouterLink to={"/tags/create?kind=" + props.kind}>
                <Icon iconName={svgPlus}></Icon>
              </RouterLink>
            </div>
            <div>{"增加"}</div>
          </li>
          {refTags.value.map(tag => (
            <li onClick={() => onTagSelect(tag.id)}>
              <div
                class={[s.sign, tag.id === props.selected && s.selected]}
                onTouchstart={e => {
                  onTouchStart(e, tag.id);
                }}
                onTouchend={onTouchEnd}>
                {tag.sign}
              </div>
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
          {refTags.value.length > 0 && <div class={s.tip}>提示：长按标签即可编辑</div>}
        </div>
      </div>
    );
  },
});
