<template>
	<div>
		<div class="view-header">
			<slot name="header-p"></slot>
		</div>
		<div class="view-body">
			<div class="left-p">
				<slot name="left-p"></slot>
			</div>
			<div class="right-p">
				<slot name="right-p"></slot>
			</div>
		</div>
		<div class="view-footer">
			<slot name="footer-p"></slot>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.view-body{
	  display: flex;
	  flex-direction: row;
	  .left-p{
	    width: 45%;
		margin-left: 2%;
	  }
	  .right-p{
	    width: 45%;
		margin-left: 5%;
	  }
	}
</style>
