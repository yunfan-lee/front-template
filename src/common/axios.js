import axios from "axios";
import config from "@/config";
import { Message } from "element-ui";
import $cookie from "vue-cookies";
import router from "@/router";

const instance = axios.create({
    timeout: 10000,
    baseURL: `${config.baseUrl}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "access-token": $cookie.get("access-token") || ""
    },
    validateStatus: () => {
        return true;
    }
});
const localLogout = res => {
    if (document.getElementsByClassName("el-message--error").length < 1) {
        Message.error("登录过期，请重新登录");
    }
    $cookie.remove("access-token");
    /* $cookie.remove('user-info-manage')
    // 清除server 存的 code 403 server没清
    $cookie.remove('ncov-user') */
    router.push({ name: "login" });
    return Promise.reject(res);
};

instance.interceptors.response.use(
    res => {
        if (res.status === 403) {
            return localLogout.call(res);
        }
        if (res.status === 204) return res; // 获取验证码无返回
        const { code, message } = res.data;
        if (code === 403) {
            return localLogout.call(res);
        } else if (code !== 200 && code !== 0) {
            Message.error(message);
            return Promise.reject(message);
        } else return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
