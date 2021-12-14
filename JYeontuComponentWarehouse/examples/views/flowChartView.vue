<template>
    <div>
        <div class="title">
            流程图组件（JFlowchart）
            <div class="detail">
                可拖拽流程图组件
            </div>
        </div>
        <div class="view-body">
            <div class="flowchart-body">
                <!-- <flowchart :chartData = "chartData"></flowchart> -->
                <j-flow-chart :chartData="chartData"></j-flow-chart>
            </div>
            <div class="table-body">
                <div>流程图chartData配置表</div>
                <j-table :title="title" :tableData="tableData"> </j-table>
                <div style="margin-top: 2rem;">流程项data配置表</div>
                <j-table :title="title" :tableData="tableData1"> </j-table>
            </div>
        </div>
        <j-code-height-light :code="code"></j-code-height-light>
    </div>
</template>

<script>
export default {
    name: "flowChartView",
    components: {},
    data() {
        return {
            chartData: {
                title: "可拖拽流程图",
                dragAble: true,
                width: 50,
                radius: true,
                data: [
                    {
                        icon: require("@/assets/logo.png"),
                        text: "准备"
                    },
                    {
                        icon: require("@/assets/1.png"),
                        text: "开始"
                    },
                    {
                        icon: require("@/assets/test.jpg"),
                        text: "开发"
                    },
                    {
                        icon: require("@/assets/1.png"),
                        text: "测试"
                    },
                    {
                        icon: require("@/assets/logo.png"),
                        text: "完成"
                    },
                    {
                        icon: require("@/assets/1.png"),
                        text: "开始"
                    },
                    {
                        icon: require("@/assets/test.jpg"),
                        text: "开发"
                    },
                    {
                        icon: require("@/assets/1.png"),
                        text: "测试"
                    },
                    {
                        icon: "",
                        text: "完成"
                    }
                ]
            },
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
                    parameter: "title",
                    field: "标题",
                    type: "String",
                    describe: "顶部显示标题"
                },
                {
                    parameter: "dragAble",
                    field: "拖拽",
                    type: "Boolean",
                    describe: "是否可拖拽，默认为false"
                },
                {
                    parameter: "width",
                    field: "宽度",
                    type: "Number",
                    describe: "每个流程的宽度"
                },
                {
                    parameter: "data",
                    field: "流程数据",
                    type: "Array",
                    describe: "定义流程配置信息，具体如下表"
                },
                {
                    parameter: "radius",
                    field: "圆角",
                    type: "Boolean",
                    describe: "流程icon是否为圆角"
                }
            ],
            tableData1: [
                {
                    parameter: "icon",
                    field: "图标",
                    type: "require图片数据",
                    describe: "注意要使用require，组件才可以接收到图片"
                },
                {
                    parameter: "text",
                    field: "显示文字",
                    type: "String",
                    describe: "icon下方显示的文字"
                }
            ],
            code: "",
            cmOptions: {
                mode: "text/javascript",
                theme: "base16-dark"
            }
        };
    },
    created() {
        // let chartData = this.chartData;
        let data = this.chartData.data;
        this.chartData.data = this.chartData.data.concat([...data]);
        this.chartData.data = this.chartData.data.concat([...data]);
        this.code = `
          <j-flow-chart :chartData="chartData"></j-flow-chart>

          chartData:{
            title:'可拖拽流程图',
            dragAble:true,
            width:50,
            radius:true,
            data:[
              {
                icon:require('@/assets/logo.png'),
                text:'准备'
              },
              {
                icon:require('@/assets/1.png'),
                text:'开始'
              },
              {
                icon:require('@/assets/test.jpg'),
                text:'开发'
              },
              {
                icon:require('@/assets/1.png'),
                text:'测试'
              },
              {
                icon:require('@/assets/logo.png'),
                text:'完成'
              },
              {
                icon:require('@/assets/1.png'),
                text:'开始'
              },
              {
                icon:require('@/assets/test.jpg'),
                text:'开发'
              },
              {
                icon:require('@/assets/1.png'),
                text:'测试'
              },
              {
                icon:'',
                text:'完成'
              }
            ]
          },
      `;
    }
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
.view-body {
    display: flex;
    flex-direction: row;
    .flowchart-body {
        width: 40%;
    }
    .table-body {
        width: 40%;
        margin-top: 2rem;
        margin-left: 10%;
    }
}
@media screen and (max-width: 1000px) {
    .view-body {
        display: flex;
        flex-direction: column;
        .flowchart-body {
            width: 100%;
        }
        .table-body {
            width: 80%;
            margin: 2rem auto;
        }
    }
}
</style>
