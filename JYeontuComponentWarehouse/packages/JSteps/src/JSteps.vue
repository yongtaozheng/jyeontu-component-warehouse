<template>
    <div class="j-steps" id="j-steps">
        <div
            v-for="(item, index) in showDataList"
            :key="index"
            class="j-steps-item"
        >
            <div class="item-header">
                <div class="left-box">
                    <template v-if="index % 2 == 0">
                        <div class="top-box" :style="obj2Style(titleStyle)">
                            {{ item.title }}
                        </div>
                        <div
                            class="bottom-box"
                            :style="obj2Style(descriptStyle)"
                        >
                            {{ item.descript }}
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class="hold-box"
                            :style="
                                obj2Style(
                                    timeStyle,
                                    'text-align: right;padding-right: 5px;'
                                )
                            "
                        >
                            {{ item.time }}
                        </div>
                    </template>
                </div>
                <div class="item-icon">{{ item.icon }}</div>
                <div class="right-box">
                    <template v-if="index % 2 == 1">
                        <div class="top-box" :style="obj2Style(titleStyle)">
                            {{ item.title }}
                        </div>
                        <div
                            class="bottom-box"
                            :style="obj2Style(descriptStyle)"
                        >
                            {{ item.descript }}
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class="hold-box"
                            :style="
                                obj2Style(
                                    timeStyle,
                                    'text-align: left;padding-left: 5px;'
                                )
                            "
                        >
                            {{ item.time }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="item-content">
                <div class="content-left"></div>
                <div
                    v-if="index !== dataList.length - 1"
                    class="v-line"
                    :style="getLineStyle()"
                ></div>
                <div class="content-right">
                    <div class="item-title"></div>
                    <div class="item-descript"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { camelTo_ } from "../../utils/strTool";
export default {
    name: "JSteps",
    props: {
        direction: {
            type: String,
            default: "horizontal" //horizontal 横向 vertical 纵向
        },
        iconWidth: {
            type: Number,
            default: 50
        },
        sortBy: {
            type: String,
            default: "time"
        },
        lineStyle: {
            type: Object,
            default: () => {
                return {
                    color: "skyblue",
                    height: "100px"
                };
            }
        },
        titleStyle: {
            type: Object,
            default: () => {
                return {
                    fontWeight: "bold"
                };
            }
        },
        descriptStyle: {
            type: Object,
            default: () => {
                return {};
            }
        },
        timeStyle: {
            type: Object,
            default: () => {
                return {
                    fontWeight: "bold"
                };
            }
        },
        dataList: {
            type: Array,
            default: () => {
                return [
                    {
                        title: "版本0.1.4",
                        descript: "优化：代码高亮组件",
                        time: "2021-12-01",
                        icon: "图标"
                    },
                    {
                        title: "版本0.1.3",
                        descript: "增加：悬浮按钮组件，弹窗组件",
                        time: "2021-11-28",
                        icon: "图标"
                    },
                    {
                        title: "版本0.1.2",
                        descript: "增加：数字滚动变化效果组件",
                        time: "2021-11-26",
                        icon: "图标"
                    },
                    {
                        title: "版本0.1.1",
                        descript: "项目搭建",
                        time: "2021-11-24",
                        icon: "图标"
                    },
                    {
                        title: "版本0.1.0",
                        descript: "创建npm库",
                        time: "2021-11-22",
                        icon: "图标"
                    }
                ];
            }
        }
    },
    data() {
        return {
            showDataList: 0
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initData();
            let jSteps = document.getElementById("j-steps");
            parent = jSteps.parentElement;
            console.log("---", jSteps, parent, parent.offsetWidth);
        },
        initData() {
            if (this.sortBy) {
                this.showDataList = this.dataList.sort((a, b) => {
                    return a[this.sortBy] - b[this.sortBy];
                });
            } else {
                this.showDataList = this.dataList;
            }
        },
        obj2Style(obj, res = "") {
            for (let k in obj) {
                res += camelTo_(k) + ":" + obj[k] + ";";
            }
            return res;
        },
        getLineStyle() {
            let res = "";
            const lineStyle = this.lineStyle;
            for (let k in lineStyle) {
                if (k == "height") {
                    res += "min-height:" + lineStyle["height"] + ";";
                } else if (k == "color") {
                    res += "border:1px solid " + lineStyle["color"] + ";";
                } else {
                    res += camelTo_(k) + ":" + lineStyle[k] + ";";
                }
            }
            if (!lineStyle["color"]) res += "border:1px solid skyblue;";
            if (!lineStyle["height"]) res += "min-height:200px;";
            return res;
        },
        barClick(index) {
            this.showTab = index;
            this.$emit("clickTab", index);
        },
        getBarClass(index, val = "") {
            let res = "";
            if (index == this.showTab) {
                res += "active-tab";
            }
            return res + " " + val;
        }
    }
};
</script>

<style lang="scss" scoped="scoped">
.j-steps {
    width: 100%;
    .j-steps-item {
        .item-content {
            display: flex;
            .content-left,
            .content-right {
                flex: 1;
            }
            .v-line {
                width: 0px;
            }
        }
        .item-header {
            display: flex;
            // min-width: 200px;
            height: 52px;
            .hold-box {
                height: 52px;
                line-height: 52px;
            }
            .left-box,
            .right-box {
                // flex: 1;
                width: calc(50% - 25px);
                max-height: 26px;
                display: flex;
                flex-direction: column;
                .top-box {
                    flex: 1;
                    border-bottom: 1px solid rgba(100, 173, 254, 0.6);
                }
                .bottom-box {
                    flex: 1;
                    border-top: 1px solid rgba(100, 173, 254, 0.6);
                }
            }
            .item-icon {
                width: 50px;
                height: 50px;
                border: 1px deepskyblue solid;
                border-radius: 50%;
                line-height: 50px;
                text-align: center;
            }
        }
    }
}
</style>
