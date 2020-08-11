import Vue from "vue";

/* 自定义全局函数，对超过n位小数的保留n位小数，小于n位小数的不处理，默认保留2位小数 */
Vue.prototype.fixedByBit = function(number, n = 2) {
    let num = Number(number);
    return /\.\d{3,}$/.test(num) ? Number(num.toFixed(n)) : num;
};

/* 10以下数字补0 */
Vue.prototype.num2Str = function(n) {
    return isNaN(Number(n)) ? "" : (Number(n) < 10 ? "0" : "") + n;
};

/* created by liyunfan
 * compute the new date by option
 * option: true -> add, false -> minus
 */
Vue.prototype.computeDate = function(time, months = 0, days = 0, option) {
    if (arguments.length === 0) {
        return null;
    }
    let date;
    try {
        date = new Date(time);
    } catch (error) {
        return null;
    }
    if (option) {
        date.setDate(date.getDate() + days);
        date.setMonth(date.getMonth() + months);
    } else {
        date.setDate(date.getDate() - days);
        date.setMonth(date.getMonth() - months);
    }
    return date;
};

/**
 * 计算两个日期之间相差的月份
 * @param {Date} minDate 最小日期
 * @param {Date} maxDate 最大日期
 */
Vue.prototype.getMonthRange = function(minDate, maxDate) {
    if (minDate && maxDate) {
        const min = new Date(minDate);
        const max = new Date(maxDate);
        const minYear = min.getFullYear();
        const minMonth = min.getMonth() + 1;
        const maxYear = max.getFullYear();
        const maxMonth = max.getMonth() + 1;
        return maxYear * 12 + maxMonth - (minYear * 12 + minMonth);
    } else {
        return "";
    }
};

/* 时间戳格式化 */
Number.prototype.format = function(format = "{y}-{m}-{d} {h}:{i}:{s}") {
    let time = this;
    if (`${time}`.length < 10) {
        return null;
    } else if (`${time}`.length < 13) {
        time *= (13 - length) * 10;
    }
    return new Date(time).format(format);
};

/* 格式化时间 */
Date.prototype.format = function(format = "{y}-{m}-{d} {h}:{i}:{s}") {
    const formatObj = {
        y: this.getFullYear(),
        m: this.getMonth() + 1,
        d: this.getDate(),
        h: this.getHours(),
        i: this.getMinutes(),
        s: this.getSeconds(),
        a: this.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
    return time_str;
};
