import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  plugins: [vue()],
  server: {
    port: 3333, // 打开的端口号
    open: true, // 运行时打开浏览器
    proxy: {
      "/api": {
        target: "https://api.lovelive.tools/", //接口的前缀
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
      "/ache": {
        target: "http://82.157.160.30:8080/",
        // target: "http://localhost:8080/",
        pathRewrite: {
          "^/ache": "",
        },
      },
      "/chp": {
        target: "https://api.shadiao.pro/",
        changeOrigin: true,
        pathRewrite: {
          "^/chp": "",
        },
      },
      "/pyq": {
        target: "https://api.shadiao.pro/",
        changeOrigin: true,
        pathRewrite: {
          "^/pyq": "",
        },
      },
      "/du": {
        target: "https://api.shadiao.pro/",
        changeOrigin: true,
        pathRewrite: {
          "^/du": "",
        },
      },
    },
  },
});
