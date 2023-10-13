import { createPinia } from "pinia";
import { createApp } from "vue";
import { App } from "./App";
import { router } from "./config/router";
import { useMeStore } from "./stores/useMeStore";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

const meStore = useMeStore();
meStore.refreshMe();

const noLoginCheckList = {
  exact: ["/", "/items/list"],
  startWith: ["/welcome", "/sign_in"],
};

router.beforeEach(async (to, from) => {
  let noLoginCheck = false;
  if (noLoginCheckList.exact.indexOf(to.path) >= 0) {
    noLoginCheck = true;
  } else {
    noLoginCheckList.startWith.forEach(value => {
      if (to.path.startsWith(value)) noLoginCheck = true;
    });
  }
  let result;
  try {
    await meStore.mePromise;
    result = true;
  } catch (error) {
    result = "/sign_in?return_to=" + to.path;
  }

  return noLoginCheck || result;
});
