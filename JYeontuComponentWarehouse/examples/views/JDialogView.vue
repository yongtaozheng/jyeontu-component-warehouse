<template>
    <split-horizontal>
        <template v-slot:header-p>
            <div class="title">
                对话弹窗（JDialog）
                <div class="detail">
                    页面弹出窗口
                </div>
            </div>
        </template>
        <template v-slot:left-p>
            <div class="content">
                <j-dialog
                    :title="title"
                    ref="JDialog"
                    closable="true"
                    @confirm="confirm"
                    :btnList="btnList"
                >
                    <template v-slot:j-dialog-main-content>
                        <p>人生就像海洋</p>
                        <p>只有意志坚强的人才能到达彼岸</p>
                        <!-- 注释 -->
                    </template>
                </j-dialog>
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
    name: "JDialogView",
    components: {
        splitHorizontal
    },
    data() {
        return {
            title: "我是标题",
            btnList: [
                {
                    text: "取消",
                    style: {
                        backgroundColor: "orangered"
                    },
                    click: "close"
                },
                {
                    text: "确认",
                    style: {
                        backgroundColor: "seagreen"
                    },
                    click: "confirm"
                }
            ],
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
                    describe: "左上角显示标题"
                },
                {
                    parameter: "closable",
                    field: "点击遮罩关闭弹窗",
                    type: "Boolean",
                    describe: "默认为false"
                },
                {
                    parameter: "btnList",
                    field: "底部按钮列表",
                    type: "Array",
                    describe: "具体配置如下代码"
                }
            ]
        };
    },
    created() {
        this.code = `
		<j-dialog :title="title" 
				closable="true" 
				:btnList="btnList">
			<template v-slot:j-dialog-main-content>
				<div>人生就像海洋</div>
				<div>只有意志坚强的人才能到达彼岸</div>
			</template>
		</j-dialog>
		
		data(){
		  return {
			title:"我是标题",
			btnList:[
				{
					text:'取消',
					style:{
						backgroundColor:'orangered'
					},
					click:'close'
				},
				{
					text:'确认',
					style:{
						backgroundColor:'seagreen'
					},
					click:'confirm'
				}
			]
		  }
		},
		mounted() {
			
		},
		methods:{
		  confirm(){
		  		console.log('confirm');
		  		this.$refs.JDialog.closeDialog();
		  }
		}
	`;
    },
    mounted() {},
    methods: {
        confirm() {
            console.log("confirm");
            this.$refs.JDialog.closeDialog();
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
