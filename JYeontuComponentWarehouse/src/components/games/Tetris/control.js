/**
 * 获取方块底部边缘坐标
 * @param {Array} block 方块
 * @param {Number} x 当前下移长度
 * @param {Number} y 当前右移长度
 * **/
function getBotton(block,x,y){
    let res = [];
    for(let i = 0;i < block[0].length; i++){
        for(let j = block.length - 1; j >= 0; j--){
            if(block[j][i] == 1){
                res.push({
                    x:j,
                    y:i
                })
                break;
            }
        }
    }
    return res;
}
/**
 * 获取方块顶部边缘坐标
 * @param {Array} block 方块
 * @param {Number} x 当前下移长度
 * @param {Number} y 当前右移长度
 * **/
function getTop(block,x,y){
    let res = [];
    for(let i = 0;i < block[0].length; i++){
        for(let j = 0; j < block.length; j++){
            if(block[j][i] == 1){
                res.push({
                    x:j,
                    y:i
                })
                break;
            }
        }
    }
    return res;
}
/**
 * 获取方块左侧边缘坐标
 * @param {Array} block 方块
 * @param {Number} x 当前下移长度
 * @param {Number} y 当前右移长度
 * **/
function getLeft(block,x,y){
    let res = [];
    for(let i = 0;i < block.length; i++){
        for(let j = 0; j < block[i].length; j++){
            if(block[i][j] == 1){
                res.push({
                    x:i,
                    y:j
                })
                break;
            }
        }
    }
    return res;
}
/**
 * 获取方块右侧边缘坐标
 * @param {Array} block 方块
 * @param {Number} x 当前下移长度
 * @param {Number} y 当前右移长度
 * **/
function getRight(block,x,y){
    let res = [];
    for(let i = 0;i < block.length; i++){
        for(let j = block[i].length - 1; j >= 0; j--){
            if(block[i][j] == 1){
                res.push({
                    x:i,
                    y:j
                })
                break;
            }
        }
    }
    return res;
}
/**
 * 获取方块右侧边缘坐标
 * @param {Array} block 方块
 * @param {Number} x 当前下移长度
 * @param {Number} y 当前右移长度
 * **/
function changeBlock(block){
    let newBlock = new Array(block[0].length);
    for(let i = 0; i < newBlock.length; i++) newBlock[i] = [];
    for(let i = 0; i < block.length; i++){
        for(let j = 0; j < block[i].length; j++){
            newBlock[j][block.length - 1 - i] = block[i][j];
        }
    }
    console.log(block,newBlock);
    return newBlock;
}
export default {
    getRight,
    getTop,
    getLeft,
    getBotton,
    changeBlock
}
