/**
 * 随机函数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 随机数
 * **/
function randomNum(min,max){
    switch(arguments.length){
        case 1:
            return Math.floor(Math.random()*minNum+1);
            break;
        case 2:
            return Math.floor(Math.random()*(max-min+1)+min);
            break;
        default:
            return 0;
            break;
    }
}
export default {
    randomNum
}
