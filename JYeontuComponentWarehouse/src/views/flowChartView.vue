<template>
	<div style="width: 60%;">
		<flowchart :chartData = "chartData"></flowchart>
	</div>
</template>

<script>
	import flowchart from '@/components/flowchart.vue'
	export default {
		name:'flowChartView',
		components:{
			flowchart
		},
		data(){
			return {
				chartData:{
					title:'可拖拽流程图',
					dragAble:true,
					width:50,
					radius:true,
					data:[
						{
							icon:require('@/assets/logo.png'),
							text:'准备'
						},
						{
							icon:require('@/assets/1.png'),
							text:'开始'
						},
						{
							icon:require('@/assets/test.jpg'),
							text:'开发'
						},
						{
							icon:require('@/assets/1.png'),
							text:'测试'
						},
						{
							icon:require('@/assets/logo.png'),
							text:'完成'
						},
						{
							icon:require('@/assets/1.png'),
							text:'开始'
						},
						{
							icon:require('@/assets/test.jpg'),
							text:'开发'
						},
						{
							icon:require('@/assets/1.png'),
							text:'测试'
						},
						{
							icon:'',
							text:'完成'
						}
					]
				}
			}
		}
	}
</script>

<style>
</style>
