import axios from "./axios";

/* 发送短信验证码 */
export const msgValiation = () => {
    return axios.request({
        url: "/logon/msgValiation",
        method: "get"
    });
};

