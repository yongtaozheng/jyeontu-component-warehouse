<template>
	<div class="j-steps">
		
	</div>
</template>

<script>
	export default{
		name:"JSteps",
		props:{
			direction:{
				type:String,
				default:'horizontal'//horizontal 横向 vertical 纵向
			}
		},
		data() {
			return{
				showTab:0
			}
		},
		created() {
			this.init();
		},
		methods:{
			init(){
				this.showTab = this.defaultShowTab;
			},
			barClick(index){
				this.showTab = index;
				this.$emit('clickTab',index);
			},
			getBarClass(index,val=''){
				let res = '';
				if(index == this.showTab){
					res += 'active-tab';
				}
				return res + ' ' + val;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
</style>
