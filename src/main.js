import { createApp } from "vue";
import config from "@/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import "@/assets/css/element.scss";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
config.init(app);
app.use(router);
app.use(createPinia());
app.mount("#app");
