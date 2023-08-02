import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mangosteen-demo/",
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      transformOn: true,
      mergeProps: true,
    }),
    createSvgSpritePlugin({ symbolId: "icon-[name]-[hash]" }),
  ],
  server: {
    host: "localhost", //ip地址
    port: 3000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
  },
});
