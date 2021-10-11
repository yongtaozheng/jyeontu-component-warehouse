/**
 * @description '-'连接命名转换成小驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 小驼峰形式字符串 
 **/
export const _toLittleCamel = function(str){
	let newStr = str.split('-');
	if(newStr.length <= 1) return str;
	let res = newStr[0];
	for(let i = 1; i < newStr.length; i++){
		res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
	}
	return res;
}/**
 * @description '-'连接命名转换成小驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 小驼峰形式字符串 
 **/
export const _toLittleCamel = function(str){
	let newStr = str.split('-');
	if(newStr.length <= 1) return str;
	let res = newStr[0];
	for(let i = 1; i < newStr.length; i++){
		res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
	}
	return res;
}
/**
 * @description '-'连接命名转换成大驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 大驼峰形式字符串 
 **/
export const _toBigCamel = function(str){
	let newStr = str.split('-');
	if(newStr.length <= 1) return str;
	let res = newStr[0][0].toUpperCase() + newStr[0].substr(1);
	for(let i = 1; i < newStr.length; i++){
		res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
	}
	return res;
}