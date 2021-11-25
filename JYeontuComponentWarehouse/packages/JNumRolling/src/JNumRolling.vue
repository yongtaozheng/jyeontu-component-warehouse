<template>
	<div>
		<div id="j-num-rolling" class="j-num-rolling">
			
		</div>
	</div>
</template>

<script>
	import {camelTo_} from '../../utils/strTool'
	export default{
		name:"JNumRolling",
		props:{
			//数字
			nums:{
				type:String,
				default:"0"
			},
			//数字尺寸
			fontSize:{
				type:Number,
				default:4
			},
			//每走一步的时间(ms)
			stepTime:{
				type:Number,
				default:200
			},
			//保存小数点
			fixNum:{
				type:Number,
				default:2
			},
			//自定义样式
			numStyle:{
				type:Object,
				default:{
					
				}
			},
			//数字刷新时间
			refreshTime:{
				type:Number,
				default:3
			}
		},
		watch:{
			nums:{
				handler(newVal,oldVal){
					//console.log(new Date().getTime(),this.oldTime,(new Date().getTime() - this.oldTime));
					if(this.oldTime == 0){
						this.oldTime = new Date().getTime();
						this.numRolling(newVal,oldVal);
					}else if((new Date().getTime() - this.oldTime) >= (this.refreshTime * 1000)){
						//console.log(newVal,oldVal);
						this.oldTime = new Date().getTime();
						this.numRolling(newVal,this.oldVal);
					}
				}
			}
		},
		data(){
			return{
				numArr:[],
				headNum:10,
				oldTime:0,
				oldVal:'',
			}
		},
		mounted(){
			// this.autoChange();
			this.init();
		},
		methods:{
			getStyle(){
				let fontSize = this.fontSize;
				let res = '';
				res += 'font-size:' + fontSize/3 + 'rem;';
				res += 'line-height:' + fontSize + 'rem;';
				res += 'height:' + fontSize + 'rem;';
				return res;
			},
			getNumStyle(){
				let res = '';
				let numStyle = this.numStyle;
				for(let k in numStyle){
					res += camelTo_(k) + ':' + numStyle[k] + ';';
				}
				return res;
			},
			//初始化，创建容器节点
			initElement(){
				let dom = ``;
				let flag = true;
				for(let i = 0; i < this.numArr.length; i++){
					let num = parseInt(this.numArr[i]);
					if(num >= 0 && num <= 9 ){
						if(num > 0) flag = false;
						dom += `
						<div class="j-num-rolling-body" style="${(flag?'display:none;':'')+this.getStyle() + this.getNumStyle()}">
							<div id="num-content${i}" 
								style="bottom:${num * this.fontSize}rem;${this.getStyle()}" 
								class="num-content">
						`
						for(let j = 0; j < 20; j++){
							dom += `
								<div style="${this.getStyle()}">${j % 10}</div>
							`
						}
						dom += `
							</div>
						</div>
						`
					}else{
						dom += `
						<div class="j-num-rolling-body" style="${this.getStyle()}">
							<div class="num-content" style="${this.getStyle()}">
								<div  style="${this.getStyle()}">${this.numArr[i]}</div>
							</div>
						</div>
						`
					}
				}
				document.getElementById('j-num-rolling').innerHTML = dom;
			},
			//初始化数据
			init(){
				this.numArr = parseFloat(this.nums).toFixed(this.fixNum).split('');
				let temp = new Array(this.headNum).fill(0);
				this.numArr = temp.concat(this.numArr);
				this.initElement();
			},
			//自动增加数字，测试
			autoChange(){
				this.changAnime();
				setTimeout(()=>{
					this.autoChange();
				},2000);
			},
			//点击修改数字，测试
			changAnime(){
				this.nums = (parseFloat(this.nums) + 3.9).toFixed(this.fixNum);
			},
			//修改
			chang(oldVal,newVal,id){
				if(oldVal >= newVal) return;
				let stepTime = this.stepTime;
				let time = Math.ceil((newVal - oldVal) / this.fontSize);
				time = stepTime / time;
				const dom = document.getElementById(id);
				// console.log(oldVal,newVal,id,dom);
				// console.log('time',time);
				oldVal += 0.5;
				if(oldVal >= 20){
					oldVal %= 20;
					newVal %= 20;
				}
				if(oldVal >= 10){
					oldVal %= 10;
					newVal %= 10;
					if(newVal < oldVal) newVal += 10;
				}
				dom.style.bottom = oldVal * this.fontSize + 'rem';
				setTimeout(()=>{
					this.chang(oldVal,newVal,id);
				},time);
			},
			//数据变化时触发，处理变化后的数据
			numRolling(newVal,oldVal){
				this.oldVal = newVal;
				oldVal = parseFloat(oldVal).toFixed(this.fixNum).toString().split('');
				newVal = parseFloat(newVal).toFixed(this.fixNum).toString().split('');
				let headNum = this.headNum;
				//数位发生变化，前面补零
				while(oldVal.length < newVal.length){
					oldVal.unshift('0');
					headNum--;
					document.getElementById('num-content'+headNum).parentNode.style.display = 'flex';
				}
				//修改前置位标记数
				this.headNum = headNum;
				for(let i = 0; i < newVal.length; i++){
					let num = parseInt(newVal[i]);
					if(num >= 0 && num <= 9 ){
						let oldV = parseFloat(oldVal[i]),newV = parseFloat(newVal[i]);
						if(oldV > newV) newV += 10;
						this.chang(oldV,newV,'num-content'+(i + headNum));
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.j-num-rolling{
		display: flex;
		.j-num-rolling-body{
			height: 2rem;
			line-height: 2rem;
			width: 1rem;
			overflow: hidden;
			margin-left: 0.2rem;
			.num-content{
				width: 1rem;
				position: relative;
				bottom:0rem;
				scroll-behavior: smooth;
				display: flex;
				flex-direction: column;
				font-weight: bold;
			}
		}
	}
</style>
