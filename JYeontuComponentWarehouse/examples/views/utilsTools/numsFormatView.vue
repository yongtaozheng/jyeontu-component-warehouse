<template>
    <div class="numsFormatView">
        <div class="title">
            数字处理函数（numsFormat）
            <div class="detail">
                数字格式转换及常用数字处理
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
                :util="'numsFormat'"
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
var numsFormat = require("@/utils/numsFormat.js");
import methodTest from "@/components/common/methodTest.vue";
export default {
    name: "numsFormatView",
    components: {
        methodTest
    },
    data() {
        return {
            methodData: [
                {
                    name: "numberToWords",
                    params: [
                        {
                            name: "数字(必填)",
                            value: 12345,
                            required: true
                        }
                    ]
                },
                {
                    name: "numberToChineseWords",
                    params: [
                        {
                            name: "数字字符串(必填)",
                            value: "12345",
                            required: true
                        }
                    ]
                },
                {
                    name: "numberToSplitWords",
                    params: [
                        {
                            name: "数字字符串(必填)",
                            value: "12345",
                            required: true
                        },
                        {
                            name: "分隔符(默认为',')",
                            value: "",
                            required: false
                        }
                    ]
                },
                {
                    name: "intToRoman",
                    params: [
                        {
                            name: "整数数字(必填)[1:3999]",
                            value: 345,
                            required: true
                        }
                    ]
                },
                {
                    name: "romanToInt",
                    params: [
                        {
                            name: "罗马数字(必填)",
                            value: "CCCXLV",
                            required: true
                        }
                    ]
                }
            ],
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
                    method: "numberToWords(num: Number)",
                    explain: "数字转换为英文表示",
                    parameter: "num:数字"
                },
                {
                    method: "numberToChineseWords(str: String)",
                    explain: "数字转换为大写中文表示",
                    parameter: "str:数字字符串"
                },
                {
                    method: "numberToSplitWords(num:String,separator:String)",
                    explain: "数字千分位分隔",
                    parameter: "num:数字字符串,separator:分隔符(默认为',')"
                },
                {
                    method: "intToRoman(num:Number)",
                    explain: "整数转罗马数字",
                    parameter: "num:整数"
                },
                {
                    method: "romanToInt(s:String)",
                    explain: "罗马数字转整数",
                    parameter: "s:罗马数字"
                }
            ],
            keyWords: [
                {
                    value: "numsFormat",
                    color: "green"
                }
            ],
            code: ""
        };
    },
    created() {
        this.code = `
		/*
		*数字处理函数
		*/
	   
		var numsFormat = require('@/utils/numsFormat.js');//引入函数
		
		//使用函数
		numsFormat.numberToWords('321123');//数字转换为英文表示
		numsFormat.numberToChineseWords('321123');//数字转换为大写中文表示
		numsFormat.numberToSplitWords('321123',',');//数字千分位分隔
		numsFormat.intToRoman('123');//整数转罗马数字
		numsFormat.romanToInt('CCCXII');//罗马数字转整数
			`;
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.numsFormatView {
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
