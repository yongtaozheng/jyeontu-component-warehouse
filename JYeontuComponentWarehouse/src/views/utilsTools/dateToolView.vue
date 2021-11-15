<template>
	<div class="dateToolView">
		<div class="title">
			日期处理函数（dateTool）
			<div class="detail">
				日期格式转换及常用日期获取
			</div>
		</div>
		<div class="explain">
			<div class="title">说明</div>
			<j-table :title="title"
					 :tableData="tableData"
					 >
			</j-table>
		</div>
		<div class="test">
			<div class="title">测试</div>
			<div class="test-method">
				方法：<input class="method" v-model="testMethod"></input>
				<button class="btn" @click="doTestCode()">点击调用</button>
				结果：<div class="result">{{testResult}}</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	var dateTool = require('@/utils/dateTool.js');
	import JTable from '@/components/JTable.vue'
	export default {
		name:"dateToolView",
		components:{
			JTable
		},
		data() {
			return {
				testMethod:"dateFormat('2021-11-15 22:22:22','yyyy-mm-dd')",
				testResult:'',
				title:[
					{
						title:'方法',//展示列名
						key:'method',//字段名
						type: '', // 列类型
						readOnly:true,//是否只读
						width:'20vw',//列宽度
						columnStyle: '', // 列样式
						fixed: false,//是否固定
						sort: false, // 是否支持排序
					},
					{
						title:'说明',//展示列名
						key:'explain',//字段名
						type: '', // 列类型
						readOnly:true,//是否只读
						width:'40vw',//列宽度
						columnStyle: '', // 列样式
						fixed: false,//是否固定
						sort: false, // 是否支持排序
					},
					{
						title:'参数',//展示列名
						key:'parameter',//字段名
						type: '', // 列类型
						readOnly:true,//是否只读
						width:'40vw',//列宽度
						columnStyle: '', // 列样式
						fixed: false,//是否固定
						sort: false, // 是否支持排序
					}
				],
				tableData:[
					{
						'method':'dateFormat(value: String,formatStr: string)',
						'explain':'将时间按照所传入的时间格式进行转换',
						'parameter':"value:日期(必填)，formatStr:格式(默认值：'yyyy-mm-dd')",
					},
					{
						'method':'getToday(str: String)',
						'explain':'获取当前时间并按照所传入的时间格式进行转换',
						'parameter':"str:格式(默认值：'yyyy-mm-dd')",
					},
					{
						'method':'beforeDay(date:String,n:Number)',
						'explain':'获取前n天日期',
						'parameter':"date:日期，n:前n天",
					},
					{
						'method':'afterDay(date:String,n:Number)',
						'explain':'获取后n天日期',
						'parameter':"date:日期，n:后n天",
					},
				],
			}
		},
		created() {
			console.log(dateTool.getToday());
		},
		methods:{
			doTestCode(){
				let res = this.testMethod;
				const reg = /(.*)\((.*)\)/g;
				res = reg.exec(res);
				let method = res[1],param = res[2];
				param = param.replace(/\'/g,'');
				param = param.split(',');
				console.log('method',method,'param',param);
				switch(method){
					case 'getToday':
						this.testResult = dateTool.getToday(param[0]);
						break;
					case 'dateFormat':
						if(param[1]) this.testResult = dateTool.dateFormat(param[0],param[1]);
						else this.testResult = dateTool.dateFormat(param[0]);
						break;
					case 'beforeDay':
						this.testResult = dateTool.beforeDay(param[0],param[1]);
						break;
					case 'afterDay':
						this.testResult = dateTool.afterDay(param[0],param[1]);
						break;
					default :
						break;
				}
				console.log(res);
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.dateToolView{
		padding: 0.2rem;
		.title{
			font-size: x-large;
			text-align: left;
			margin-bottom: 1rem;
			.detail{
				font-size: medium;
				color: dimgrey;
				margin-top: 1rem;
			}
		}
		.explain{
			margin-top: 3rem;
		}
		.test{
			margin-top: 3rem;
			.test-method{
				display: flex;
				.method{
					min-width: 30rem;
					text-align: center;
				}
				.btn{
					margin-left: 0.8rem;
					margin-right: 1rem;
				}
			}
			.result{
				min-width: 20rem;
				border-bottom: 1px solid dimgrey;
			}
		}
	}
</style>
