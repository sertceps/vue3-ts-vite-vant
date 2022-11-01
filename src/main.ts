import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";
// Vant
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
