<template>
	<split-horizontal>
		<template v-slot:header-p>
			<div class="title">
				安装（jvuewheel）
				<div class="detail">
					
				</div>
			</div>
			<div style="margin-top: 3rem;" class="title">
				npm 安装
				<div class="detail">
					推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。
				</div>
				<div class="code">
					<span>npm i jvuewheel -S</span>
				</div>
			</div>
			<div style="margin-top: 3rem;" class="title">
				main.js引入
				<div class="detail">
					
				</div>
				<div class="code">
					<div>//引入组件库</div>
					<div>import jvuewheel from '@jyeontu/jvuewheel'</div>
					<div>//引入样式</div>
					<div>import '@jyeontu/jvuewheel/lib/jvuewhell.css'</div>
					<div>Vue.use(jvuewheel);</div>
				</div>
			</div>
		</template>
	</split-horizontal>
</template>

<script>
	import splitHorizontal from '@/components/pages/splitHorizontal.vue'
	export default{
		name:'installView',
		components:{
			splitHorizontal
		}
	}
</script>

<style>
</style>
