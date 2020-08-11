import Vue from "vue";
import Router from "vue-router";
import routes from "./routers";
import store from "@/store";
import $cookie from "vue-cookies";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

Vue.use(Router);
const router = new Router({
    routes,
    mode: "hash"
});

const NO_NEED_LOGIN = ["login"];
const LOGIN_PAGE_NAME = "login";
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (["introduction"].includes(to.name)) return next();
    const token = $cookie.get("access-token");
    if (!token && !NO_NEED_LOGIN.includes(to.name)) {
        // 未登录且要跳转的页面不是登录页，跳转到登录页
        next({ name: LOGIN_PAGE_NAME });
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页，继续跳转
        next();
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页，跳转到home页
        next({ name: "index" });
    } else {
        next();
    }
    NProgress.done();
});

router.afterEach(to => {
    document.title = to.meta.title;
    window.scrollTo(0, 0);
});
// router 报错处理
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

export default router;
