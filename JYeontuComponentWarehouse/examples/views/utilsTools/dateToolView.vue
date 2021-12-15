<template>
    <div class="dateToolView">
        <div class="title">
            日期处理函数（dateTool）
            <div class="detail">
                日期格式转换及常用日期获取
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
                :util="'dateTool'"
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
var dateTool = require("@/utils/dateTool.js");
import methodTest from "@/components/common/methodTest.vue";
export default {
    name: "dateToolView",
    components: {
        methodTest
    },
    data() {
        return {
            testMethod: "dateFormat('2021-11-15 22:22:22','yyyy-mm-dd')",
            testResult: "",
            methodData: [
                {
                    name: "dateFormat",
                    params: [
                        {
                            name: "日期(必填)",
                            value: dateTool.getToday(),
                            required: true
                        },
                        {
                            name: "格式(默认yyyy-mm-dd)",
                            value: "",
                            required: false,
                            options: [
                                "yyyy-mm-dd",
                                "mm-dd-yyyy",
                                "yyyy-mm-dd hh:MM:ss",
                                "hh:MM:ss",
                                "yyyy",
                                "mm",
                                "dd",
                                "hh",
                                "MM",
                                "ss",
                                "mm-dd"
                            ]
                        }
                    ]
                },
                {
                    name: "getToday",
                    params: [
                        {
                            name: "格式(默认yyyy-mm-dd)",
                            value: "",
                            required: false,
                            options: [
                                "yyyy-mm-dd",
                                "mm-dd-yyyy",
                                "yyyy-mm-dd hh:MM:ss",
                                "hh:MM:ss",
                                "yyyy",
                                "mm",
                                "dd",
                                "hh",
                                "MM",
                                "ss",
                                "mm-dd"
                            ]
                        }
                    ]
                },
                {
                    name: "beforeDay",
                    params: [
                        {
                            name: "日期(必填)",
                            value: dateTool.getToday(),
                            required: true
                        },
                        {
                            name: "前n天(必填)",
                            value: 15,
                            required: true
                        }
                    ]
                },
                {
                    name: "afterDay",
                    params: [
                        {
                            name: "日期(必填)",
                            value: dateTool.getToday(),
                            required: true
                        },
                        {
                            name: "后n天(必填)",
                            value: 15,
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
                    method: "dateFormat(value: String,formatStr: string)",
                    explain: "将时间按照所传入的时间格式进行转换",
                    parameter:
                        "value:日期(必填)，formatStr:格式(默认值：'yyyy-mm-dd')"
                },
                {
                    method: "getToday(str: String)",
                    explain: "获取当前时间并按照所传入的时间格式进行转换",
                    parameter: "str:格式(默认值：'yyyy-mm-dd')"
                },
                {
                    method: "beforeDay(date:String,n:Number)",
                    explain: "获取前n天日期",
                    parameter: "date:日期，n:前n天"
                },
                {
                    method: "afterDay(date:String,n:Number)",
                    explain: "获取后n天日期",
                    parameter: "date:日期，n:后n天"
                }
            ],
            keyWords: [
                {
                    value: "dateTool",
                    color: "green"
                }
            ]
        };
    },
    created() {
        // console.log(dateTool.getToday());
        this.code = `
		/*
		*日期处理函数
		*/
	   
		var dateTool = require('@/utils/dateTool.js');//引入函数
		
		//使用函数
		dateTool.dateFormat('2021-11-15 22:22:22','yyyy-mm-dd');//日期格式化
		dateTool.getToday('yyyy-mm-dd');//获取今天日期并格式化
		dateTool.beforeDay('2021-11-15',10);//获取2021-11-15前10天的日期
		dateTool.afterDay('2021-11-15',10);//获取2021-11-15后10天的日期
			`;
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.dateToolView {
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
