<template>
    <td class="j-tr-content" :colspan="title.length" :style="getMargin()">
        <template v-for="(item, index) in tableData">
            <tr
                class="j-table-tr j-table-title"
                :key="tableId + '-' + index"
                v-if="showTitle && index === 0"
            >
                <td
                    v-for="(item, index) in title"
                    :key="item.key"
                    :width="item.width"
                    class="j-table-tr-th"
                >
                    {{ item.title }}
                    <button
                        v-if="item.sort"
                        @click="sortByKey(item.key, index)"
                        :title="getSortWay(item)"
                        class="sort-btn"
                    >
                        sort
                    </button>
                </td>
            </tr>
            <tr :key="tableId + '-' + index" class="j-tr-tr">
                <td
                    v-for="(item1, index1) in title"
                    :key="index1"
                    class="j-tr-tr-td"
                    :style="getStyle(item1)"
                >
                    <input
                        v-if="!item1.readOnly"
                        v-model="item[item1.key]"
                        class="j-tr-tr-td-input"
                    />
                    <span :title="item[item1.key]" v-else>
                        <span
                            v-if="item.children && index1 == 0"
                            @click="cellClick(index)"
                            style="cursor: pointer;color:skyblue;font-weight:bold;"
                        >
                            {{
                                expendList.indexOf(tableId + "-" + index) == -1
                                    ? ">"
                                    : "v"
                            }}
                        </span>
                        {{ item[item1.key] }}
                    </span>
                </td>
            </tr>
            <j-tr
                v-if="expendList.indexOf(tableId + '-' + index) != -1"
                :key="tableId + '-' + index"
                :tableId="tableId + '-' + index"
                :tableData="item.children.data"
                :title="item.children.title"
            ></j-tr>
        </template>
    </td>
</template>

<script>
import { _toLittleCamel, camelTo_ } from "../../utils/strTool";
export default {
    name: "JTr",
    props: {
        tableId: {
            type: String,
            default: "1"
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        title: {
            //表格头
            type: Array,
            default() {
                return [];
            }
        },
        tableData: {
            //表格数据
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            expendList: []
        };
    },
    methods: {
        getMargin() {
            let ind = this.tableId.split("-").length - 1;
            return "padding-left:" + 0.4 * ind + "rem";
        },
        getShow(index) {
            let flag = this.tableId + "-" + index;
            return flag; //this.expendList.indexOf(flag) != -1;
        },
        cellClick(index) {
            let flag = this.tableId + "-" + index;
            let ind = this.expendList.indexOf(flag);
            // console.log(flag, ind, this.expendList);
            if (ind == -1) {
                this.expendList.push(flag);
            } else {
                this.expendList.splice(ind, 1);
            }
        },
        //指定列排序
        sortByKey(key, ind) {
            let tableData = this.tableData;
            let title = this.title;
            // console.log(key,title[ind]);
            if (title[ind].sortWay == "desc") {
                tableData = tableData.sort((a, b) => {
                    return b[key].localeCompare(a[key]);
                });
                title[ind].sortWay = "asc";
            } else {
                tableData = tableData.sort((a, b) => {
                    return a[key].localeCompare(b[key]);
                });
                title[ind].sortWay = "desc";
            }
        },
        //获取当前排序方式
        getSortWay(item) {
            if (item.sortWay == "desc") {
                return "降序";
            }
            return "升序";
        },
        initTitle() {
            let title = this.title;
            if (title.length === 0) {
                this.showTitle = false;
                const key = Object.keys(this.tableData[0]);
                let width = (1 / key.length) * 100;
                width = width.toFixed(2) + "vw";
                for (const k in this.tableData[0]) {
                    const obj = {
                        title: k, //展示列名
                        key: k, //字段名
                        type: "text", // 列类型
                        readOnly: "true", //是否只读
                        width: width, //列宽度
                        columnStyle: "", // 列样式
                        fixed: false, //是否固定
                        sort: false, // 是否支持排序
                        sortWay: "asc" //asc:升序,desc:降序
                    };
                    title.push(obj);
                }
            }
        },
        //初始化表格
        initTable() {
            let th = document.getElementsByClassName("j-tr-tr-th");
            // console.log('initTable',th,title);
            for (let i = 0; i < title.length; i++) {
                if (title[i].width) {
                    th[i].style.maxWidth = title[i].width;
                    th[i].style.width = title[i].width;
                } else {
                    // th[i].style.width = title[i].width;
                }
                if (title[i].columnStyle) {
                    let style = title[i].columnStyle.split(";");
                    // console.log('style',style);
                    for (let item of style) {
                        if (item == "") break;
                        item = item.split(":");
                        // console.log('item',_toLittleCamel(item[0]),item[1]);
                        th[i].style[_toLittleCamel(item[0])] = item[1];
                    }
                } else {
                }
            }
        },
        //转化columnStyle的格式
        getStyle(item1) {
            let style = item1.columnStyle.split(";");
            let res = "";
            if (item1.width != "") {
                res = "max-width:" + item1.width + ";";
                res += "width:" + item1.width + ";";
            }
            for (let item of style) {
                if (item == "") break;
                item = item.split(":");
                res += camelTo_(item[0]) + ":" + item[1] + ";";
            }
            return res;
        }
    },
    mounted() {
        this.initTitle();
        this.initTable();
    }
};
</script>

<style lang="scss" scoped>
.j-tr-content {
    border-bottom: 1px solid black;
    margin-bottom: 1rem;
    &:last-child {
        border-bottom: none;
    }
    .j-table-tr {
        border-bottom: 1px solid black;
        .j-table-tr-th {
            background-color: #0eb9e5;
            border-right: 1px solid grey;
            padding: 4px 4px 4px 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .sort-btn {
                background-color: dodgerblue;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 0.2rem;
            }
        }
    }
    .j-tr-tr:last-child {
        border-bottom: none;
    }
    .j-tr-tr {
        .j-table-tr-th:last-child {
            border-right: none;
        }
        border-top: 1px solid black;
        .j-tr-tr-td {
            border-right: 1px solid grey;
            padding: 4px 4px 4px 4px;
            // overflow: hidden;
            text-overflow: ellipsis;
            // white-space: nowrap;
            word-wrap: break-word;
            word-break: break-all;
            .j-tr-tr-td-input {
                border: 0; // 去除未选中状态边框
                outline: none; // 去除选中状态边框
                background-color: rgba(0, 0, 0, 0); // 透明背景
                text-align: center;
                width: inherit;
            }
        }
        .j-tr-tr-td:last-child {
            border-right: none;
        }
    }
}
</style>
