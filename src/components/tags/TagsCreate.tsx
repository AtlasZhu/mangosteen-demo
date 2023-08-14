import { defineComponent } from "vue";
import svgBack from "../../assets/icons/back.svg";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import s from "./TagsCreate.module.scss";
export const TagsCreate = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          icon: () => <Icon iconName={svgBack} />,
          title: () => "新建标签",
          content: () => (
            <form class={s.form}>
              <div class={s.tagNameWrapper}>
                <span>标签名</span>
                <input />
                <span class={s.error}>必填</span>
              </div>
              <div class={s.tagEmojiWrapper}>
                <span class={s.tagEmojiTitle}>符号</span>
                <div class={[s.tagEmojiList, s.emojiErrorBorder]}>
                  <nav>
                    <span>表情</span>
                    <span>手势</span>
                    <span>职业</span>
                    <span>衣服</span>
                    <span>动物</span>
                    <span>自然</span>
                    <span>食物</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                    <span>运动</span>
                  </nav>
                  <ul>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                    <li>{"\u{1F600}"}</li>
                  </ul>
                </div>
                <span class={s.emojiErrorText}>必填</span>
              </div>
              <div class={s.emojiTips}>
                <p>记账时长按标签即可进行编辑</p>
              </div>
              <div class={s.buttonWrapper}>
                <Button class={s.button}>确定</Button>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
