<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                电子屏数字（JElectronicNumber）
                <div class="detail">
                    电子屏风格数字组件
                </div>
            </div>
            <div class="header"></div>
        </template>
        <template v-slot:left-p>
            <div class="content">
                <j-electronic-number
                    :numbers="numbers"
                    :number-color="numberColor"
                    :number-size="numberSize"
                >
                </j-electronic-number>
            </div>
        </template>
        <template v-slot:right-p>
            <j-table :title="title" :tableData="tableData"> </j-table>
        </template>
        <template v-slot:footer-p>
            <j-code-height-light :code="code" class="footer">
            </j-code-height-light>
        </template>
    </split-horizontal>
</template>
<script>
import splitHorizontal from "@/components/pages/splitHorizontal.vue";
import { getToday } from "@/utils/dateTool";
export default {
    name: "electronicNumbers",
    components: {
        splitHorizontal
    },
    data() {
        return {
            numbers: [],
            numberColor: "#8076a3",
            numberSize: "2rem",
            code: "",
            title: [
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
                    parameter: "numbers",
                    field: "数字数组",
                    type: "Array",
                    describe: '需要展示的数字，如:["2021-11-11 10:57:52"]'
                },
                {
                    parameter: "numberColor",
                    field: "数字颜色",
                    type: "String",
                    describe: '如："#000000" 或 "pink"'
                },
                {
                    parameter: "numberSize",
                    field: "数字大小",
                    type: "String",
                    describe: '如："1rem"'
                }
            ]
        };
    },
    created() {
        this.code = `
            <j-electronic-number :numbers="numbers" 
								:number-color="numberColor" 
								:number-size="numberSize" >
            </j-electronic-number>

            numbers:[],
            numberColor:'#8076a3',
            numberSize:'1rem'

            mounted(){
              this.getTime();
            },
            methods:{
              getTime(){
                let day = getToday('yyyy-mm-dd hh:MM:ss');
                this.numbers = [day];
                setTimeout(()=>{
                  this.getTime();
                },1000);
              }
            }
	`;
    },
    mounted() {
        this.getTime();
    },
    methods: {
        getTime() {
            let day = getToday("yyyy-mm-dd hh:MM:ss");
            this.numbers = [day];
            setTimeout(() => {
                this.getTime();
            }, 1000);
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
    width: 50%;
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
