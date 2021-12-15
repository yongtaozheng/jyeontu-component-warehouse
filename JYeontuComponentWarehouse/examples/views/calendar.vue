<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                日历组件（JCalendar）
                <div class="detail">
                    日历组件
                </div>
            </div>
        </template>
        <template v-slot:left-p>
            <div class="content">
                <j-calendar
                    :title="title"
                    :bgSrc="bgSrc"
                    @selectDay="selectDay"
                    @changeMonth="changeMonth"
                >
                </j-calendar>
            </div>
        </template>
        <template v-slot:right-p>
            <j-table :title="tableTitle" :tableData="tableData"> </j-table>
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
    name: "calendar",
    components: {
        splitHorizontal
    },
    data() {
        return {
            title: "JYeontu的日历",
            bgSrc: "https://images8.alphacoders.com/992/992329.jpg",
            code: "",
            tableTitle: [
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
            tableData: [
                {
                    parameter: "title",
                    field: "标题",
                    type: "String",
                    describe: "日历上方显示标题"
                },
                {
                    parameter: "bgSrc",
                    field: "背景图",
                    type: "String/require请求图片",
                    describe: "在线链接/require请求本地图片"
                },
                {
                    parameter: "selectDay",
                    field: "选择日期",
                    type: "function",
                    describe: "点击日期时回调"
                },
                {
                    parameter: "changeMonth",
                    field: "月份修改",
                    type: "function",
                    describe: "月份修改时回调"
                }
            ]
        };
    },
    created() {
        this.code = `
		<j-calendar :title="title" 
					:bgSrc="bgSrc" 
					@selectDay="selectDay" 
					@changeMonth="changeMonth">
		</j-calendar>
		
		data(){
		  return {
			title:"JYeontu的日历",
			bgSrc:"https://images8.alphacoders.com/992/992329.jpg",
		  }
		},
		methods:{
		  selectDay(e){
			// console.log(e);
		  },
		  changeMonth(e){
			// console.log(e);
		  }
		}
	`;
    },
    methods: {
        selectDay(e) {
            // console.log(e);
        },
        changeMonth(e) {
            // console.log(e);
        }
    }
};
</script>
<style scoped lang="scss">
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
.content {
    margin: auto auto;
    // width: 50%;
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
