<template>
	<split-horizontal>
		<template v-slot:header-p>
			<div class="title">
				对话弹窗（JDialog）
				<div class="detail">
					页面弹出窗口
				</div>
			</div>
		</template>
		<template v-slot:left-p>
		  <div class="content">
			<j-dialog>
				
			</j-dialog>
		  </div>
		</template>
		<template v-slot:right-p>
			<j-table :title="tableTitle"
					 :tableData="tableData">
			</j-table>
		</template>
		<template v-slot:footer-p>
			<j-code-height-light :code="code"
								class="footer">
				
			</j-code-height-light>
		</template>
	</split-horizontal>
</template>
<script>
import splitHorizontal from '@/components/pages/splitHorizontal.vue'
export default {
  name:'JDialogView',
  components:{
	splitHorizontal,
  },
  data(){
    return {
		nums:'999999',
		numStyle:{
			border:'2px solid skyblue',
			boxShadow:'10px 10px 5px #185D8C',
			marginLeft:'0.5rem',
		},
		code:'',
		tableTitle:[
			{
				title:'参数',//展示列名
				key:'parameter',//字段名
				type: '', // 列类型
				readOnly:true,//是否只读
				width:'20vw',//列宽度
				columnStyle: '', // 列样式
				fixed: false,//是否固定
				sort: false, // 是否支持排序
			},
			{
				title:'字段名',//展示列名
				key:'field',//字段名
				type: '', // 列类型
				readOnly:true,//是否只读
				width:'30vw',//列宽度
				columnStyle: '', // 列样式
				fixed: false,//是否固定
				sort: false, // 是否支持排序
			},
			{
				title:'数据类型',//展示列名
				key:'type',//字段名
				type: '', // 列类型
				readOnly:true,//是否只读
				width:'15vw',//列宽度
				columnStyle: '', // 列样式
				fixed: false,//是否固定
				sort: false, // 是否支持排序
			},
			{
				title:'描述',//展示列名
				key:'describe',//字段名
				type: '', // 列类型
				readOnly:true,//是否只读
				width:'35vw',//列宽度
				columnStyle: '', // 列样式
				fixed: false,//是否固定
				sort: false, // 是否支持排序
			}
		],
		tableData:[
			{
				'parameter':'nums',
				'field':'数字',
				'type':'String',
				'describe':'需要滚动的数字'
			},
			{
				'parameter':'fontSize',
				'field':'数字尺寸，行高',
				'type':'Number',
				'describe':'默认为4，fone-size为参数除于3'
			},
			{
				'parameter':'stepTime',
				'field':'滚动速度',
				'type':'Number',
				'describe':'每走一步的时间(ms)，默认值为200'
			},
			{
				'parameter':'fixNum',
				'field':'保留小数点',
				'type':'Number',
				'describe':'数字保留小数点，默认为2'
			},
			{
				'parameter':'numStyle',
				'field':'自定义数字格子样式',
				'type':'Object',
				'describe':''
			},
			{
				'parameter':'refreshTime',
				'field':'数字刷新间隔',
				'type':'Number',
				'describe':'数字刷新间隔(s)，默认为3'
			}
		],
	}
  },
  created() {
  	this.code = `
		<j-num-rolling :nums = "nums" 
			:fixNum = "2" 
			:stepTime = "200" 
			:refreshTime = "2" 
			:fontSize = "4" 
			:numStyle = "numStyle">
			
		</j-num-rolling>
		
		data(){
		  return {
			nums:'999999',
			numStyle:{
				border:'2px solid skyblue',
				boxShadow:'10px 10px 5px #185D8C',
				marginLeft:'0.5rem',
			},
		  }
		},
		mounted() {
			this.autoChange();
		},
		methods:{
		  //自动增加数字，测试
		  autoChange(){
		  	this.nums = parseFloat(this.nums) + 12345.67;
		  	setTimeout(()=>{
		  		this.autoChange();
		  	},5000);
		  },
		}
	`
  },
  mounted() {
  	this.autoChange();
  },
  methods:{
    //自动增加数字，测试
    autoChange(){
    	this.nums = parseFloat(this.nums) + 12345.67;
    	setTimeout(()=>{
    		this.autoChange();
    	},5000);
    },
  }
}
</script>
<style scoped lang="scss">
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
  .content{
    margin:auto auto;
    // width: 50%;
  }
  .header{
  	min-height: 4rem;
  	text-align: center;
  }
  .footer{
  	margin-top: 2rem;
  	margin-left: 2%;
  	width:95%;
  }
</style>
