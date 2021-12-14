/**
 * @description '-'连接命名转换成小驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 小驼峰形式字符串
 **/
export const _toLittleCamel = function(str) {
    let newStr = str.split("-");
    if (newStr.length <= 1) return str;
    let res = newStr[0];
    for (let i = 1; i < newStr.length; i++) {
        res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
    }
    return res;
};
/**
 * @description '-'连接命名转换成大驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 大驼峰形式字符串
 **/
export const _toBigCamel = function(str) {
    let newStr = str.split("-");
    if (newStr.length <= 1) return str;
    let res = "";
    for (let i = 0; i < newStr.length; i++) {
        res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
    }
    return res;
};
/**
 * @description 驼峰命名转换成'-'连接命名
 * @param {String} str 需要转换的字符串
 * @return {String} '-'连接形式字符串
 **/
export const camelTo_ = function(str) {
    let res = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= "A" && str[i] <= "Z") {
            if (i == 0) res += str[i].toLowerCase();
            else {
                res += "-" + str[i].toLowerCase();
            }
        } else {
            res += str[i];
        }
    }
    return res;
};
