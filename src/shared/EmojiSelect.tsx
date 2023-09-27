import { computed, defineComponent, ref } from "vue";
import s from "./EmojiSelect.module.scss";
import { emojiList } from "./emojiList";
export const EmojiSelect = defineComponent({
  props: { value: { type: String, required: false } },
  setup(props, context) {
    const table: [string, string[]][] = [
      [
        "表情",
        [
          "face-smiling",
          "face-affection",
          "face-tongue",
          "face-hand",
          "face-neutral-skeptical",
          "face-sleepy",
          "face-unwell",
          "face-hat",
          "face-glasses",
          "face-concerned",
          "face-negative",
          "face-costume",
        ],
      ],
      [
        "手势",
        [
          "hand-fingers-open",
          "hand-fingers-partial",
          "hand-single-finger",
          "hand-fingers-closed",
          "hands",
          "hand-prop",
          "body-parts",
        ],
      ],
      [
        "人物",
        [
          "person",
          "person-gesture",
          "person-role",
          "person-fantasy",
          "person-activity",
          "person-sport",
          "person-resting",
        ],
      ],
      ["衣服", ["clothing"]],
      [
        "动物",
        [
          "cat-face",
          "monkey-face",
          "animal-mammal",
          "animal-bird",
          "animal-amphibian",
          "animal-reptile",
          "animal-marine",
          "animal-bug",
        ],
      ],
      ["植物", ["plant-flower", "plant-other"]],
      ["自然", ["sky & weather", "science"]],
      ["食物", ["food-fruit", "food-vegetable", "food-prepared", "food-asian", "food-marine", "food-sweet"]],
      ["运动", ["sport", "game"]],
    ];
    const listSelected = ref(0);
    const emojiSelected = ref("");
    const emojis = computed(() =>
      table[listSelected.value][1].map(str =>
        emojiList
          .find(item => item[0] === str)?.[1]
          .map(emoji => (
            <li
              onClick={() => {
                context.emit("update:modelValue", emoji);
                emojiSelected.value = emoji;
              }}
              class={emojiSelected.value === emoji ? s.selected : ""}>
              {emoji}
            </li>
          )),
      ),
    );
    const navItems = computed(() =>
      table.map((listName, index) => (
        <span
          onClick={() => {
            listSelected.value = index;
          }}
          class={index === listSelected.value ? s.selected : ""}>
          {listName[0]}
        </span>
      )),
    );
    return () => (
      <div class={[s.emojiList, s.emojiError]}>
        <nav>{navItems.value}</nav>
        <ul>{emojis.value}</ul>
      </div>
    );
  },
});
