<template>
    <div>
        <split-horizontal>
            <template v-slot:header-p>
                <div class="title">
                    版本介绍（jvuewheel）
                    <div class="detail">
                        目前最新版本为0.1.4
                    </div>
                </div>
            </template>
        </split-horizontal>
        <div class="content">
            <j-steps
                :dataList="dataList"
                :iconWidth="iconWidth"
                :titleStyle="titleStyle"
                :timeStyle="timeStyle"
                :descriptStyle="dataList"
                :lineStyle="lineStyle"
            >
            </j-steps>
        </div>
    </div>
</template>

<script>
import splitHorizontal from "@/components/pages/splitHorizontal.vue";
export default {
    name: "versionInfo",
    components: {
        splitHorizontal
    },
    data() {
        return {
            iconWidth: 50,
            lineStyle: {
                color: "skyblue",
                height: "100px"
            },
            titleStyle: {
                color: "black",
                fontWeight: "bold"
            },
            descriptStyle: {},
            timeStyle: {
                color: "orange",
                fontWeight: "bold"
            },
            dataList: [
                {
                    title: "版本0.1.5（待发布）",
                    descript:
                        "优化：代码高亮组件、表格组件增加展开行功能；增加：步骤图组件",
                    time: "未定",
                    icon: "未"
                },
                {
                    title: "版本0.1.4（已发布）",
                    descript: "优化：代码高亮组件",
                    time: "2021-12-01",
                    icon: "01"
                },
                {
                    title: "版本0.1.3（已发布）",
                    descript: "增加：悬浮按钮组件、弹窗组件",
                    time: "2021-11-28",
                    icon: "28"
                },
                {
                    title: "版本0.1.2（已发布）",
                    descript: "增加：数字滚动变化效果组件；工具函数",
                    time: "2021-11-26",
                    icon: "26"
                },
                {
                    title: "版本0.1.1（已发布）",
                    descript:
                        "项目搭建，导入：日历组件、电子屏数字组件、流程图组件、表格组件、代码高亮组件、canvas画板组件",
                    time: "2021-11-24",
                    icon: "图标"
                },
                {
                    title: "版本0.1.0（已发布）",
                    descript: "初始化npm库",
                    time: "2021-11-22",
                    icon: "22"
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 70%;
    margin-left: 15%;
}
</style>
