import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3333, // 打开的端口号
    open: false, // 运行时打开浏览器
    proxy: {
      "/api": {
        target: "https://api.lovelive.tools/", //接口的前缀
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
      "/ache": {
        target: "http://10.214.111.114:8080/",
        pathRewrite: {
          "^/ache": "",
        },
      },
    },
  },
});
