import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /** 自动导入 */
    // AutoImport({
    //   resolvers: [VantResolver()],
    // }),
    /** 自动导入 */
    Components({
      resolvers: [VantResolver()],
    }),
    /** svg 图标 */
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/vars.module.scss";`,
      },
    },
  },
});
