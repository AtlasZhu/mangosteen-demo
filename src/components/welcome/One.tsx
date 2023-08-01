import { defineComponent } from "vue";
import { WelcomeLayout } from "./WelcomeLayout";
import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg";
import { RouterLink } from "vue-router";

export const One = defineComponent({
  setup() {
    // const slots = {
    //   title: () => (
    //     <>
    //       <h2>会挣钱</h2>
    //       <h2>还会省钱</h2>
    //     </>
    //   ),
    //   icon: () => <img src={pig} alt="会挣钱"></img>,
    //   buttons: () => (
    //     <>
    //       <RouterLink class={s.fake} to="/start">
    //         跳过
    //       </RouterLink>
    //       <RouterLink to="/welcome/two">下一页</RouterLink>
    //       <RouterLink to="/start">跳过</RouterLink>
    //     </>
    //   ),
    // };
    // return () => <WelcomeLayout v-slots={slots} />;
    return () => (
      <WelcomeLayout>
        {{
          title: () => (
            <h2>
              会挣钱
              <br />
              还会省钱
            </h2>
          ),
          icon: () => <img src={pig} alt="会挣钱"></img>,
          buttons: () => (
            <>
              <RouterLink class={s.fake} to="/start">
                跳过
              </RouterLink>
              <RouterLink to="/welcome/two">下一页</RouterLink>
              <RouterLink to="/start">跳过</RouterLink>
            </>
          ),
        }}
      </WelcomeLayout>
    );
  },
});
