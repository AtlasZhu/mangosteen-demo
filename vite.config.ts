import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VantResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      transformOn: true,
      mergeProps: true,
    }),
    createSvgSpritePlugin({ symbolId: "icon-[name]-[hash]" }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    host: "localhost", //ip地址
    port: 20408, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes("vant")) {
            return "vant";
          }
          if (id.includes("echarts")) {
            return "echarts";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
