/* eslint-disable no-unused-vars,no-undef */
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/icon/iconfont.css";

// 导入组件库
import jvuewhell from "./../packages/index";
// 注册组件库
Vue.use(jvuewhell);
Vue.use(ElementUI);

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
