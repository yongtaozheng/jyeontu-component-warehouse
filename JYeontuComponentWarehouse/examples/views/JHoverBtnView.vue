<template>
	<split-horizontal>
		<template v-slot:header-p>
			<div class="title">
				悬浮按钮（JHoverBtn）
				<div class="detail">
					可拖拽悬浮按钮组件
				</div>
			</div>
		</template>
		<template v-slot:left-p>
		  <div class="content">
			<j-hover-btn bgColor = 'pink'
						width = '80'
						text = '按钮文字'
						:btn-style = "btnStyle"
						@hoverBtnClick = "hoverBtnClick()">
				
			</j-hover-btn>
		  </div>
		</template>
		<template v-slot:right-p>
			<j-table :title="tableTitle"
					 :tableData="tableData"
					 style="height: 500px;">
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
  name:'JHoverBtnView',
  components:{
	splitHorizontal,
  },
  data(){
    return {
		code:'',
		btnStyle:{
			"fontSize":'small'
		},
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
				'parameter':'bgColor',
				'field':'按钮背景颜色',
				'type':'String',
				'describe':'默认为deepskyblue'
			},
			{
				'parameter':'autoHide',
				'field':'贴边隐藏',
				'type':'Boolean',
				'describe':'按钮移动到左右两侧会自动缩进两边，默认为true'
			},
			{
				'parameter':'clickDis',
				'field':'判断是否点击事件距离（px）',
				'type':'Number',
				'describe':'移动距离小于该值则为点击事件，默认为10'
			},
			{
				'parameter':'showWidth',
				'field':'贴边隐藏后露出宽度（px）',
				'type':'Number',
				'describe':'数字保留小数点，默认为15'
			},
			{
				'parameter':'width',
				'field':'按钮宽高（px）',
				'type':'Number',
				'describe':'默认为80'
			},
			{
				'parameter':'radius',
				'field':'是否圆角',
				'type':'Boolean',
				'describe':'默认为true'
			},
			{
				'parameter':'btnStyle',
				'field':'自定义样式',
				'type':'Object',
				'describe':'键值对形式，支持驼峰命名和-命名'
			},
			{
				'parameter':'text',
				'field':'按钮显示文字',
				'type':'String',
				'describe':"默认为'悬浮按钮'"
			},
			{
				'parameter':'zIndex',
				'field':'按钮层级',
				'type':'Number',
				'describe':'默认为999'
			}
		],
	}
  },
  created() {
  	this.code = `
		<j-hover-btn bgColor = 'pink' 
			width = '80' 
			text = '按钮文字' 
			:btn-style = "btnStyle" 
			@hoverBtnClick = "hoverBtnClick()">
			
		</j-hover-btn>
		export default {
			data(){
			  return {
				  btnStyle:{
					"fontSize":'small'
				  },
			  }
			},
			methods:{
			  hoverBtnClick(){
				alert('触发点击事件');
			  }
			}
		}
	`
  },
  mounted() {
  	this.autoChange();
  },
  methods:{
    hoverBtnClick(){
		alert('触发点击事件');
	}
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
