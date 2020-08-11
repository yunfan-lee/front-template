import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import config from "./config";
import ElementUI from "element-ui";
import "./theme/element-variables.scss";
import "./common";

VueCookies.config(`${config.cookieExpires}d`); // todo 保存10天cookie
Vue.use(VueCookies);
Vue.use(ElementUI);

import pagination from "./components/Pagination";
Vue.use(pagination);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
