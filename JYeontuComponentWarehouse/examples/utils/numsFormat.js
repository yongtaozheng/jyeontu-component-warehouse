/**
 * @description 数字转换为英文表示
 * @param {string} num 数字
 * @return {string} 英文表示
 **/
export const numberToWords = function(num) {
    const singles = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine"
    ];
    const teens = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen"
    ];
    const tens = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety"
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    const toEnglish = num => {
        const curr = [];
        const hundred = Math.floor(num / 100);
        num %= 100;
        if (hundred !== 0) {
            curr.push(singles[hundred] + " Hundred ");
        }
        const ten = Math.floor(num / 10);
        if (ten >= 2) {
            curr.push(tens[ten] + " ");
            num %= 10;
        }
        if (num > 0 && num < 10) {
            curr.push(singles[num] + " ");
        } else if (num >= 10) {
            curr.push(teens[num - 10] + " ");
        }
        return curr.join("");
    };

    if (num === 0) {
        return "Zero";
    }
    const sb = [];
    for (
        let i = 3, unit = 1000000000;
        i >= 0;
        i--, unit = Math.floor(unit / 1000)
    ) {
        const curNum = Math.floor(num / unit);
        if (curNum !== 0) {
            num -= curNum * unit;
            sb.push(toEnglish(curNum) + thousands[i] + " ");
        }
    }
    return sb.join("").trim();
};
/**
 * @description 数字转换为大写中文表示
 * @param {string} money 数字
 * @return {string} 大写中文表示
 **/
export const numberToChineseWords = money => {
    // 汉字的数字
    const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    // 基本单位
    const cnIntRadice = ["", "拾", "佰", "仟"];
    // 对应整数部分扩展单位
    const cnIntUnits = ["", "万", "亿", "兆"];
    // 对应小数部分单位
    const cnDecUnits = ["角", "分", "毫", "厘"];
    // 整数金额时后面跟的字符
    const cnInteger = "整";
    // 整型完以后的单位
    const cnIntLast = "元";
    // 最大处理的数字
    const maxNum = 9999999999999999.99;
    // 金额整数部分
    let integerNum;
    // 金额小数部分
    let decimalNum;
    // 输出的中文金额字符串
    let chineseStr = "";
    // 分离金额后用的数组，预定义
    let parts;
    if (money === "") {
        return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        // 超出最大处理数字
        return "";
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    // 转换为字符串
    money = money.toString();
    if (money.indexOf(".") === -1) {
        integerNum = money;
        decimalNum = "";
    } else {
        parts = money.split(".");
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    console.log(integerNum, decimalNum);
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            let n = integerNum.substr(i, 1);
            let p = IntLen - i - 1;
            let q = p / 4;
            let m = p % 4;
            if (n === "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                // 归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum !== "") {
        var decLen = decimalNum.length;
        for (let i = 0; i < decLen; i++) {
            let n = decimalNum.substr(i, 1);
            if (n !== "0") {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr === "") {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === "") {
        chineseStr += cnInteger;
    }
    return chineseStr;
};

/**
 * @description 数字千分位分隔
 * @param {String} num 数字
 * @param {String} separator 分隔符,默认为英文逗号','
 * @return {String} 千分位分隔后的数字
 **/
export const numberToSplitWords = function(num, separator = ",") {
    num = num.toString();
    if (num.length < 3) return num;
    let flag = "";
    if (num[0] == "-") {
        flag = "-";
        num = num.substr(1);
    }
    num = num.split(".");
    const num1 = num[0],
        len1 = num[0].length;
    let res = "";
    for (let i = 0; i < num1.length; i++) {
        if (i != 0 && i % 3 == 0) {
            res = separator + res;
        }
        res = num1[len1 - i - 1] + res;
    }
    if (num.length > 1) {
        res += ".";
        const num2 = num[1],
            len2 = num[1].length;
        for (let i = 0; i < num2.length; i++) {
            if (i != 0 && i % 3 == 0) {
                res += separator;
            }
            res += num2[i];
        }
    }
    return flag + res;
};

/**
 * @description 整数转罗马数字
 * @param {number} num 整数
 * @return {string} 罗马数字
 */
export const intToRoman = function(num) {
    //num > 0 && num <= 3999
    if (num <= 0 || num > 3999) return "数字范围应该为1~3999";
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM"
    ];
    const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    const roman = [];
    num = parseInt(num);
    roman.push(thousands[Math.floor(num / 1000)]);
    roman.push(hundreds[Math.floor((num % 1000) / 100)]);
    roman.push(tens[Math.floor((num % 100) / 10)]);
    roman.push(ones[num % 10]);
    return roman.join("");
};

/**
 * @description 罗马数字转整数
 * @param {string} s 罗马数字
 * @return {number} 整数
 */
export const romanToInt = function(s) {
    const symbolValues = new Map();
    symbolValues.set("I", 1);
    symbolValues.set("V", 5);
    symbolValues.set("X", 10);
    symbolValues.set("L", 50);
    symbolValues.set("C", 100);
    symbolValues.set("D", 500);
    symbolValues.set("M", 1000);
    let ans = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        const value = symbolValues.get(s[i]);
        if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
            ans -= value;
        } else {
            ans += value;
        }
    }
    return ans;
};
