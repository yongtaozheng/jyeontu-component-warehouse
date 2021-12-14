<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                canvas画板组件（JCanvasBroad）
                <div class="detail">
                    canvas画板组件
                </div>
            </div>
        </template>
        <template v-slot:left-p>
            <div class="broad-title">
                我的画板
            </div>
            <div class="broad-contain">
                <j-canvas-broad
                    class="canvas-baroad"
                    :toolsTabList="true"
                    :height="height"
                    :width="width"
                >
                </j-canvas-broad>
            </div>
        </template>
        <template v-slot:right-p>
            <j-table :title="title1" :tableData="tableData1"> </j-table>
        </template>
        <template v-slot:footer-p>
            <j-code-height-light :code="code" class="footer">
            </j-code-height-light>
        </template>
    </split-horizontal>
</template>

<script>
import splitHorizontal from "@/components/pages/splitHorizontal.vue";
export default {
    name: "canvasBroadView",
    components: {
        splitHorizontal
    },
    data() {
        return {
            width: -1,
            height: -1,
            title1: [
                {
                    title: "参数", //展示列名
                    key: "parameter", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "20vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "字段名", //展示列名
                    key: "field", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "30vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "数据类型", //展示列名
                    key: "type", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "15vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "描述", //展示列名
                    key: "describe", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "35vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                }
            ],
            tableData1: [
                {
                    parameter: "height",
                    field: "画板高度",
                    type: "Number",
                    describe: "默认为父元素高度*0.7"
                },
                {
                    parameter: "width",
                    field: "画板宽度",
                    type: "Number",
                    describe: "默认为父元素宽度*0.9"
                },
                {
                    parameter: "defaultPenColor",
                    field: "默认画笔颜色",
                    type: "String",
                    describe: "默认为#000000"
                },
                {
                    parameter: "defaultPenSize",
                    field: "默认画笔尺寸",
                    type: "Number",
                    describe: "默认为4px"
                },
                {
                    parameter: "defaultBackGroundColor",
                    field: "默认背景颜色",
                    type: "String",
                    describe: "默认为#ffffff"
                },
                {
                    parameter: "toolsTabList",
                    field: "工具栏tabbar显示",
                    type: "Boolean",
                    describe: "默认为false"
                }
            ],
            chatData: {},
            code: ""
        };
    },
    created() {
        this.code = `
			<j-canvas-broad class="canvas-baroad" 
						:toolsTabList="true" 
						:height="height" 
						:width="width">
			</j-canvas-broad>
			
			data(){
				return {
					width:-1,
					height:-1,
				}
			}
			`;
    },
    methods: {}
};
</script>

<style lang="scss" scoped="scoped">
.broad-title {
    line-height: 3rem;
}
.broad-contain {
    .canvas-baroad {
        // height: 300px;
        // width: 600px;
    }
}
.title {
    font-size: x-large;
    text-align: left;
    margin-bottom: 1rem;
    .detail {
        font-size: medium;
        color: dimgrey;
        margin-top: 1rem;
    }
}
.header {
    min-height: 4rem;
    text-align: center;
}
.footer {
    margin-top: 2rem;
    margin-left: 2%;
    width: 95%;
}
</style>
