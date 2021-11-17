<template>
	<div id="container">
	    <canvas id="canvas" width="600" height="300">浏览器不支持canvas<!-- 如果不支持会显示这段文字 --></canvas>
	    <div class="section">
			<button class="btn" @click="setBackGround()">清空画布</button>
		</div>
		<div class="section">
	        <span class="info">选择画笔颜色：</span>
			<input class="input-color" type="color" v-model="penColor" />
	        <!-- <button :class="getColorSelect('yellow')" style="background-color:yellow;" @click='setPenColor("yellow");'>YELLOW</button>
	        <button :class="getColorSelect('red')" style="background-color:red;" @click='setPenColor("red");'>RED</button>
	        <button :class="getColorSelect('blue')" style="background-color:blue;" @click='setPenColor("blue");'>BLUE</button>
	        <button :class="getColorSelect('green')" style="background-color:green;" @click='setPenColor("green");'>GREEN</button>
	        <button :class="getColorSelect('#fff')" style="background-color:black;color:#fff" @click='setPenColor("black");'>BLACK</button> -->
	    </div>
		<div class="section">
		    <span class="info">设置背景颜色：</span>
			<input class="input-color" type="color" v-model="brackGroudColor" />
		</div>
	    <div class="section">
	        <span class="info">选择橡皮擦：</span>
	        <button class="btn colorBtn" :style="'background-color:' + brackGroudColor + ';'" @click='setPenColor();'>WHITE</button>
	    </div>
	    <div class="section">
	        <span class="info">选择画笔大小：</span>
			<progress :value="progressValue" 
					id="progress"
					max="1" 
					@click="setPenWidth">
					{{progressValue}} %
			</progress>
	        <!-- <button :class="getWidthSelect(4)" @click="setPenWidth(4);">4PX</button>
	        <button :class="getWidthSelect(8)" @click="setPenWidth(8);">8PX</button>
	        <button :class="getWidthSelect(16)" @click="setPenWidth(16);">16PX</button> -->
	    </div>
	    <div class="section">
	        <span class="info">输出画板内容到下面的图片：</span>
	        <button class="btn" @click="createImage();">EXPORT</button>
	    </div>
	    <img id="image_png">
	</div>
</template>

<script>
	export default{
		name:'canvasBroad',
		props:{
			
		},
		watch:{
			brackGroudColor:{
				handler(newVal,oldVal){
					this.setBackGround();
				}
			}
		},
		data() {
			return{
				penColor:"#000000",
				penWidth:4,
				penClick:false,
				startAxisX:0,
				startAxisY:0,
				brackGroudColor:"#ffffff",
				progressValue:0.2
			}
		},
		created(){
			
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				// console.log('init');
				let canvas = document.getElementById('canvas'); //获取canvas标签
				let ctx = canvas.getContext("2d");//创建 context 对象
				ctx.fillStyle = this.brackGroudColor;//画布背景色
				ctx.fillRect(0,0,600,300);//在画布上绘制 600x300 的矩形，从左上角开始 (0,0)
				canvas.addEventListener("mousemove",this.drawing); //鼠标移动事件
				canvas.addEventListener("mousedown",this.penDown); //鼠标按下事件
				canvas.addEventListener("mouseup",this.penUp); //鼠标弹起事件
			},
			getWidthSelect(width){
				if(width == this.penWidth){
					return "btn bg penBtn fw"
				}
				return "btn bg penBtn"
			},
			getColorSelect(color){
				if(color == this.penColor){
					return 'btn colorBtn fw'
				}
				return 'btn colorBtn';
			},
			setBackGround(){
				const canvas = document.getElementById('canvas'); //获取canvas标签
				const ctx = canvas.getContext("2d");//创建 context 对象
				ctx.fillStyle = this.brackGroudColor;//画布背景色
				ctx.fillRect(0,0,600,300);//在画布上绘制 600x300 的矩形，从左上角开始 (0,0)
			},
			setPenWidth(event){
				const progress = document.getElementById('progress');
				this.progressValue = (event.pageX - progress.offsetLeft) / progress.offsetWidth;
				this.penWidth = 20 * this.progressValue;
			},
			//设置画笔颜色
			setPenColor(color = ''){
				if(color == '') this.penColor = this.brackGroudColor;
			    else this.penColor = color;
			},
			//设置画笔粗细
			// setPenWidth(type){
			//     this.penWidth = type
			// },
			penDown(event){
			    this.penClick = true;
			    this.startAxisX = event.pageX;
			    this.startAxisY = event.pageY;
			},
			penUp(){
			    this.penClick = false;
			},
			drawing(event){
			    if(!this.penClick) return;
				const canvas = document.getElementById('canvas'); //获取canvas标签
				const ctx = canvas.getContext("2d");//创建 context 对象
			    const stopAxisX = event.pageX;
			    const stopAxisY = event.pageY;
				const left = document.getElementById('leftMenu');
				const lw = (left.offsetWidth || 0) / 2;
			    ctx.beginPath();
			    //由于整体设置了水平居中，因此需要做特殊处理：window.screen.availWidth/2 -300
			    ctx.moveTo(this.startAxisX-(window.screen.availWidth/2 -300) - lw,this.startAxisY - lw);//moveTo(x,y) 定义线条开始坐标
			    ctx.lineTo(stopAxisX-(window.screen.availWidth/2 -300) - lw,stopAxisY - lw);//lineTo(x,y) 定义线条结束坐标
			    ctx.strokeStyle = this.penColor;
			    ctx.lineWidth = this.penWidth;
			    ctx.lineCap = "round";
			    ctx.stroke();// stroke() 方法来绘制线条
			    this.startAxisX = stopAxisX;
			    this.startAxisY = stopAxisY;
			},
			createImage() {
			    var img_png_src = canvas.toDataURL("image/png"); //将画板保存为图片格式的函数
			    // console.log('=====',img_png_src);//data:image/png;base64,iVBOR.....
			    document.getElementById("image_png").src = img_png_src;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	*{
	    margin: 0;
	    padding: 0;
	}
	#container{
	    margin: 0 auto;
	    width: 600px;
	    /*text-align: center;*/
	}
	#canvas{
	    border: 2px solid #ff6700;
	    cursor:crosshair;
	    /*不能用这种方式给canvas设置宽高*/
	    /*width: 600px;*/
	    /*height: 300px;*/
	}
	.btn{
	    width:70px;
	    height: 40px;
	    border-radius: 10px;
	    border: 1px solid #aaa;/*去掉<button>默认边框*/
	    outline:none;/*去掉<button>选中时的默认边框*/
	}
	.input-color{
	    width:70px;
	    height: 40px;
	    border-radius: 10px;
	    border: 0;/*去掉<button>默认边框*/
	    outline:none;/*去掉<button>选中时的默认边框*/
	}
	#image_png{
	    width: 300px;
	    height: 150px;
	    border:  2px solid #ff6700;
	    display: block;
	    margin: 10px auto;
	 }
	.section{
	    margin-top: 10px;
	}
	.info{
	    color: #f0f;
	    font-size: 14px;
	    line-height: 40px;
	}
	.bg{
	    background: #ff6700;
	}
	.fw{
	    font-weight: 700;
	}
</style>
