<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                安装（jvuewheel）
                <div class="detail"></div>
            </div>
            <div style="margin-top: 3rem;" class="title">
                npm 安装
                <div class="detail">
                    推荐使用 npm 的方式安装，它能更好地和 webpack
                    打包工具配合使用。
                </div>
                <div class="code">
                    <span>npm i @jyeontu/jvuewheel -S</span>
                </div>
            </div>
            <div style="margin-top: 3rem;" class="title">
                main.js引入
                <div class="detail">
                    引入后便可以在项目中直接使用
                </div>
                <div class="code">
                    <div>//引入组件库</div>
                    <div>import jvuewheel from '@jyeontu/jvuewheel'</div>
                    <div>//引入样式</div>
                    <div>import '@jyeontu/jvuewheel/lib/jvuewhell.css'</div>
                    <div>Vue.use(jvuewheel);</div>
                </div>
            </div>
            <div style="margin-top: 3rem;" class="title">
                项目地址
                <div class="detail">
                    欢迎大家一起造轮子，期待您宝贵的意见
                </div>
                <div class="code">
                    <span>Gitee：</span>
                    <a
                        href="https://gitee.com/zheng_yongtao/jyeontu-component-warehouse"
                        target="_blank"
                        >https://gitee.com/zheng_yongtao/jyeontu-component-warehouse</a
                    >
                </div>
            </div>
        </template>
    </split-horizontal>
</template>

<script>
import splitHorizontal from "@/components/pages/splitHorizontal.vue";
export default {
    name: "installView",
    components: {
        splitHorizontal
    }
};
</script>

<style></style>
