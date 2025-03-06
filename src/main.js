import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/assets/element/index.scss";
import { createApp } from "vue";

import config from "@/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
const app = createApp(App);

// import '@/assets/element/el-ui.scss'; // 优化element样式
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


config.init(app);
app.use(router);
app.use(createPinia());
app.mount("#app");
