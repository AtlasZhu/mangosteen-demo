import { defineComponent, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./ItemTags";
export const ItemCreate = defineComponent({
  setup() {
    const refSelected = ref("支出");

    type Tag = { id: number; name: string; sign: string; kind: "expenses" | "income" };
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);

    const tagsInfo = reactive({ page: 0, hasMore: false });
    type Resources<T> = { resources: T[]; pager: { page: number; per_page: number; count: number } };
    const loadMore = () => {
      http.get<Resources<Tag>>("/tags", { kind: "expenses", page: tagsInfo.page + 1 }).then(response => {
        const { resources, pager } = response.data;
        refExpensesTags.value.push(...resources);
        tagsInfo.page++;
        tagsInfo.hasMore = refExpensesTags.value.length < pager.count;
      });
    };
    onMounted(loadMore);

    return () => (
      <MainLayout>
        {{
          icon: () => (
            <RouterLink to="/start">
              <Icon iconName={svgBack} />
            </RouterLink>
          ),
          title: () => "记一笔",
          content: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refSelected.value}>
                <Tab name="支出">
                  <ItemTags kind="expenses"></ItemTags>
                </Tab>
                <Tab name="收入">
                  <ItemTags kind="income"></ItemTags>
                </Tab>
              </Tabs>
              <InputPad class={s.inputPad}></InputPad>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
