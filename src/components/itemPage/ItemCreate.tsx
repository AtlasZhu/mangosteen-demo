import { defineComponent, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import svgBack from "../../assets/icons/back.svg";
import svgPlus from "../../assets/icons/plus.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup() {
    const expenseTagExample = {
      id: 1,
      name: "餐费",
      sign: "￥",
      kind: "expenses",
    };

    const refSelected = ref("支出");

    type Tag = { id: number; name: string; sign: string; kind: "expenses" | "income" };
    type Resources<T> = { resources: T[]; pager: { page: number; per_page: number; count: number } };

    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);

    const tagsInfo = reactive({ page: 0, hasMore: false });

    onMounted(() => {
      http.get<Resources<Tag>>("/tags", { kind: "expenses" }).then(response => {
        const { resources, pager } = response.data;
        const { page, per_page, count } = pager;
        refExpensesTags.value = resources;
        tagsInfo.page++;
        tagsInfo.hasMore = (page - 1) * per_page + resources.length < count;
      });
    });

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
                      {refExpensesTags.value.map(tag => (
                        <li>
                          <div class={s.sign}>{tag.sign}</div>
                          <span class={s.name}>{tag.name}</span>
                        </li>
                      ))}
                    </ul>

                    {tagsInfo.hasMore && (
                      <div class={s.loadMore_wrapper}>
                        <Button class={s.loadMore}>加载下一页</Button>
                      </div>
                    )}
                  </div>
                </Tab>

                <Tab name="收入">
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
                      {refIncomeTags.value.map(tag => (
                        <li>
                          <div class={s.sign}>{tag.sign}</div>
                          <div class={s.name}>{tag.name}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
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
