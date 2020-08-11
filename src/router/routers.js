export default [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录"
        },
        component: () => import("_v/login/index.vue")
    },
    {
        path: "*",
        name: "error_404",
        meta: {
            hideInMenu: true
        },
        component: () => import("_v/error-page/404.vue")
    }
];
