<template>
	<div class="j-dialog">
		<div class="mask"></div>
		<div class="j-dialog-content">
			<div class="j-dialog-header"></div>
			<div class="j-dialog-main"></div>
			<div class="j-dialog-footer"></div>
		</div>
		JDialog
		<button>点我</button>
	</div>
</template>

<script>
	export default {
		name:'JDialog',
		props:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.j-dialog{
		display: auto;
		.mask{
			background-color: dimgrey;
			opacity: 0.7;
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 999;
			top: 0;
			left: 0;
		}
		.j-dialog-content{
			border: #185D8C 1px solid;
			width: 60vw;
			// height: 60vh;
			position: fixed;
			margin: auto auto;
			
		}
	}
</style>
