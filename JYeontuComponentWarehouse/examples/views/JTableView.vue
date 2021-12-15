<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                表格组件（JTable）
                <div class="detail">
                    表格组件
                </div>
            </div>
        </template>
        <template v-slot:left-p>
            <j-table :id="'t1'" ref="t1" :title="title" :tableData="tableData">
            </j-table>
        </template>
        <template v-slot:right-p>
            <j-table
                :id="'t2'"
                ref="t2"
                :title="title1"
                :tableData="tableData1"
            >
            </j-table>
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
    name: "JTableView",
    //import引入的组件需要注入到对象中才能使用",
    components: {
        splitHorizontal
    },
    data() {
        //这里存放数据",
        return {
            title: [
                {
                    title: "姓名", //展示列名
                    key: "name", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "25vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                },
                {
                    title: "年龄", //展示列名
                    key: "age", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "25vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: true // 是否支持排序
                },
                {
                    title: "职业", //展示列名
                    key: "work", //字段名
                    type: "", // 列类型
                    readOnly: true, //是否只读
                    width: "50vw", //列宽度
                    columnStyle: "", // 列样式
                    fixed: false, //是否固定
                    sort: false // 是否支持排序
                }
            ],
            tableData: [
                {
                    name: "张三",
                    age: "18",
                    work: "法外狂徒",
                    children: {
                        title: [
                            {
                                title: "姓名", //展示列名
                                key: "name", //字段名
                                type: "", // 列类型
                                readOnly: true, //是否只读
                                width: "25vw", //列宽度
                                columnStyle: "", // 列样式
                                fixed: false, //是否固定
                                sort: false // 是否支持排序
                            },
                            {
                                title: "年龄", //展示列名
                                key: "age", //字段名
                                type: "", // 列类型
                                readOnly: true, //是否只读
                                width: "25vw", //列宽度
                                columnStyle: "", // 列样式
                                fixed: false, //是否固定
                                sort: true // 是否支持排序
                            },
                            {
                                title: "职业", //展示列名
                                key: "work", //字段名
                                type: "", // 列类型
                                readOnly: true, //是否只读
                                width: "50vw", //列宽度
                                columnStyle: "", // 列样式
                                fixed: false, //是否固定
                                sort: false // 是否支持排序
                            }
                        ],
                        data: [
                            {
                                name: "张三111",
                                age: "18",
                                work: "无",
                                children: {
                                    data: [
                                        {
                                            name: "张三222",
                                            age: "18",
                                            work: "无",
                                            测试: "测试",
                                            测试1: "测试1",
                                            测试2: "测试2"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    name: "李四",
                    age: "18",
                    work: "学生"
                },
                {
                    name: "王五",
                    age: "22",
                    work: "工程师"
                }
            ],
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
                    parameter: "title",
                    field: "表头",
                    type: "Array",
                    describe: "详细参数请展开"
                },
                {
                    parameter: "tableData",
                    field: "表数据",
                    type: "Array",
                    describe: "详细参数请展开"
                }
            ],
            chatData: {},
            code: ""
        };
    },
    //监听属性 类似于data概念",
    computed: {},
    //监控data中的数据变化",
    watch: {},
    //方法集合",
    methods: {
        initData() {
            let tableData = this.tableData1;
            const titleObj = [
                {
                    parameter: "title",
                    field: "展示列名",
                    type: "String",
                    describe: "表头展示的列名"
                },
                {
                    parameter: "key",
                    field: "字段名",
                    type: "String",
                    describe: "对应展示的字段名"
                },
                {
                    parameter: "type",
                    field: "列类型",
                    type: "String",
                    describe: "列的类型(text，input)"
                },
                {
                    parameter: "readOnly",
                    field: "是否只读",
                    type: "Boolean",
                    describe: "限制是否可读"
                },
                {
                    parameter: "width",
                    field: "列宽度",
                    type: "String",
                    describe: "设置列宽度"
                },
                {
                    parameter: "columnStyle",
                    field: "列样式",
                    type: "Object",
                    describe: "设置列样式"
                },
                {
                    parameter: "sort",
                    field: "排序",
                    type: "Boolean",
                    describe: "是否支持排序"
                },
                {
                    parameter: "sortWay",
                    field: "排序方式",
                    type: "String",
                    describe: "asc:升序,desc:降序"
                }
            ];
            const title1 = [...this.title1];
            title1[0].width = "15vw";
            title1[1].width = "15vw";
            title1[2].width = "15vw";
            title1[3].width = "55vw";
            for (let i = 0; i < tableData.length; i++) {
                // tableData[i].children
                if (tableData[i].parameter === "title") {
                    tableData[i].children = {
                        title: title1,
                        data: titleObj
                    };
                }
            }
        }
    },
    //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
    beforeCreate() {},
    //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
    created() {
        this.initData();
        this.code = `
            <j-table :title="title" :tableData="tableData">
            </j-table>
            /**
             * title中的title字段会作为表头显示
             * title中key值代表列名 与 tableData中数据属性对应
             */
            title:[
            {
                title:'姓名',//展示列名
                key:'name',//字段名
                type: '', // 列类型
                readOnly:true,//是否只读
                width:'35vw',//列宽度
                columnStyle: '', // 列样式
                fixed: false,//是否固定
                sort: false, // 是否支持排序
            },
            {
                title:'年龄',//展示列名
                key:'age',//字段名
                type: '', // 列类型
                readOnly:false,//是否只读
                width:'25vw',//列宽度
                columnStyle: '', // 列样式
                fixed: false,//是否固定
                sort: true, // 是否支持排序
            },
            {
                title:'职业',//展示列名
                key:'work',//字段名
                type: '', // 列类型
                readOnly:true,//是否只读
                width:'40vw',//列宽度
                columnStyle: '', // 列样式
                fixed: false,//是否固定
                sort: false, // 是否支持排序
            }
            ],
            tableData:[
            {
                name:'张三',
                age:'18',
                work:'法外狂徒'
            },
            {
                name:'李四',
                age:'18',
                work:'学生'
            },
            {
                name:'王五',
                age:'22',
                work:'工程师'
            }
            ],
        `;
    },
    //生命周期 - 挂载之前",html模板未渲染
    beforeMount() {},
    //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
    mounted() {},
    //生命周期 - 更新之前",数据模型已更新,html模板未更新
    beforeUpdate() {},
    //生命周期 - 更新之后",数据模型已更新,html模板已更新
    updated() {},
    //生命周期 - 销毁之前",
    beforeDestroy() {},
    //生命周期 - 销毁完成",
    destroyed() {},
    //如果页面有keep-alive缓存功能，这个函数会触发",
    activated() {}
};
</script>

<style lang="scss" scoped>
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
