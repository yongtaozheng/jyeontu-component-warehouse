<template>
	<div>
		<div class="j-num-rolling">
			<div id="num-content" class="num-content ani" style="display: flex;flex-direction: column;">
				<div>0</div>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
				<div>9</div>
				<div>0</div>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
				<div>9</div>
			</div>
		</div>
		<div @click="changAnime()">点我</div>
	</div>
</template>

<script>
	export default{
		name:"JNumRolling",
		props:{
			nums:{
				type:String,
				default:"1234567"
			}
		},
		data(){
			return{
				flag:false
			}
		},
		methods:{
			init(){
				let nums = this.nums;
				
			},
			numMove(){
				
			},
			//根据名字找到动画
			findKeyframesRule(animName) {
				let rule;
				let ss = document.styleSheets;
				for (let i = 0; i < ss.length; ++i) {
					for (let x = 0; x < ss[i].cssRules.length; ++x) {
						rule = ss[i].cssRules[x];
						if (rule.name == animName && (rule.type== CSSRule.KEYFRAMES_RULE || ss[i].cssRules[j].type == CSSRule.WEBKIT_KEYFRAMES_RULE )){
						  return rule; // 可改为 console 查看当前页中所有动画属性值
						}
					}
				}
			},
			st(){
				if(this.flag) document.getElementById('num-content').style.animationPlayState = "running";
				else document.getElementById('num-content').style.animationPlayState = "paused";
				this.flag = !this.flag;
			},
			changAnime(animName = 'mymove', selector = '.j-num-rolling>.num-content'){
				console.log('changAnime');
				let keyframes = findKeyframesRule(animName);
				// 删除已经存在的开始和结束帧
				keyframes.deleteRule("0%");
				keyframes.deleteRule("100%");
				let clientWidth =  document.documentElement.clientWidth/2 || document.body.clientWidth/2 //此处为举例
		
				keyframes.appendRule("0% { bottom:12rem;}");
				keyframes.appendRule("100% { bottom:21rem; }");//结束移动屏幕一半
		
				// 重新指定动画名字使之生效
				document.getElementById('num-content').setAttribute('style','animaition: mymove 10s ease;');
				// document.querySelector(selector).style.webkitAnimationName = animName;
				// document.getElementById('num-content').style.animationPlayState = "running";
				// document.getElementById("num-content").style.WebkitAnimationPlayState = "running";
				let dom = document.getElementById('num-content');
				dom.classList.remove('ani');
				setTimeout(()=>{
					dom.classList.add('ani');
				},1000);
			}
		}
	}
</script>

<style lang="scss">
	.j-num-rolling{
		position: absolute;
		border: 1px solid black;
		height: 1.5rem;
		line-height: 1.5rem;
		overflow: hidden;
		.num-content{
			position: relative;
		}
		.ani{
			animation: mymove 10s ease;
			animation-fill-mode:forwards;
		}
	}
	
	@keyframes mymove
	{
		0% {bottom:0rem;}
		100% {bottom:12rem;}
	}
</style>
