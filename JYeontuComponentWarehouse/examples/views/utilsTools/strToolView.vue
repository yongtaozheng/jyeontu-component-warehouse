<template>
    <div class="strToolView">
        <div class="title">
            字符串处理函数（strTool）
            <div class="detail">
                字符串格式转换及常用字符串处理
            </div>
        </div>
        <div class="explain">
            <div class="title">说明</div>
            <j-table :title="title" :tableData="tableData"> </j-table>
        </div>
        <div class="test">
            <div class="title">测试</div>
            <method-test
                :methodData="methodData"
                :util="'strTool'"
            ></method-test>
        </div>
        <div class="code-content">
            <div class="title">代码</div>
            <j-code-height-light :code="code" :keyWords="keyWords">
            </j-code-height-light>
        </div>
    </div>
</template>

<script>
var strTool = require("@/utils/strTool.js");
import methodTest from "@/components/common/methodTest.vue";
export default {
    name: "strToolView",
    components: {
        methodTest
    },
    data() {
        return {
            methodData: [
                {
                    name: "_toLittleCamel",
                    params: [
                        {
                            name: "-连接的字符串",
                            value: "my-test-div",
                            required: true
                        }
                    ]
                },
                {
                    name: "_toBigCamel",
                    params: [
                        {
                            name: "-连接的字符串",
                            value: "my-test-div",
                            required: true
                        }
                    ]
                },
                {
                    name: "camelTo_",
                    params: [
                        {
                            name: "驼峰命名字符串",
                            value: "myTestDiv",
                            required: true
                        }
                    ]
                }
            ],
            code: "",
            title: [
                {
                    title: "方法", //展示列名
                    key: "method", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "20vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "说明", //展示列名
                    key: "explain", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "40vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "参数", //展示列名
                    key: "parameter", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "40vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                }
            ],
            tableData: [
                {
                    method: "_toLittleCamel(str: String)",
                    explain: "'-'连接命名转换成小驼峰命名",
                    parameter: "str:字符串"
                },
                {
                    method: "_toBigCamel(str: String)",
                    explain: "'-'连接命名转换成大驼峰命名",
                    parameter: "str:字符串"
                },
                {
                    method: "camelTo_(str:String)",
                    explain: "驼峰命名转换成'-'连接命名",
                    parameter: "str:字符串"
                }
            ],
            keyWords: [
                {
                    value: "strTool",
                    color: "green"
                }
            ]
        };
    },
    created() {
        // console.log(strTool.getToday());
        this.code = `
		/*
		*日期处理函数
		*/
	   
		var strTool = require('@/utils/strTool.js');//引入函数
		
		//使用函数
		strTool._toLittleCamel('my-test-div');//-连接命名转换成小驼峰命名 myTestDiv
		strTool._toBigCamel('my-test-div');//-连接命名转换成大驼峰命名 MyTestDiv
		strTool.camelTo_('littleCamel');//驼峰命名转换成-连接命名 little-camel
			`;
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.strToolView {
    padding: 0.2rem;
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
    .explain {
        margin-top: 3rem;
    }
    .test {
        margin-top: 3rem;
        .test-method {
            display: flex;
            .method {
                min-width: 30rem;
                text-align: center;
            }
            .btn {
                margin-left: 0.8rem;
                margin-right: 1rem;
            }
        }
        .result {
            min-width: 20rem;
            border-bottom: 1px solid dimgrey;
        }
    }
    .code-content {
        margin-top: 3rem;
    }
}
</style>
