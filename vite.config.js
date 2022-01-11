import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3333, // 打开的端口号
    open: true, // 运行时打开浏览器
    proxy: {
      "^/api": {
        target: "https://api.lovelive.tools/", //接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
      "^/hello": {
        target: "http://82.157.160.30:8080/", //不要那两行好像也行
        pathRewrite: {
          "^/hello": "", //重写路径
        },
      },
    },
  },
});
