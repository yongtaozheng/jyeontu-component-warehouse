<template>
    <div class="flow-chart" id="flow-chart">
        <div class="char-title">
            {{ chartData.title }}
        </div>
        <!-- 拖拽时移动的div -->
        <div
            id="moveDiv"
            style="position: fixed; left: 0px; top: 0px;visibility: hidden;"
        >
            <img
                :src="selectedItem.icon"
                v-if="selectedItem.icon !== ''"
                :style="getIconStyle()"
                :class="getClass('chart-content-item-icon', 'radius')"
            />
            <div
                :style="getIconStyle('text')"
                v-if="selectedItem.icon == ''"
                :class="getClass('chart-content-item-icon', 'radius')"
            >
                {{ selectedItem.text[0] }}
            </div>
            <div class="chart-content-item-text">
                {{ selectedItem.text }}
            </div>
        </div>
        <div class="chart-content" ref="chartContent" id="chartContent">
            <div
                class="chart-content-column"
                :style="getColumnStyle(index1)"
                v-for="(dataList, index1) in chartDataList"
            >
                <div
                    class="chart-content-item"
                    :style="getItemStyle()"
                    v-for="(item, index) in dataList"
                >
                    <div
                        class="chart-content-line"
                        v-if="
                            index == 0 &&
                                index1 % 2 == 1 &&
                                index1 < chartDataList.length - 1
                        "
                        :style="getLineStyle(index, index1, 'left')"
                    ></div>
                    <div
                        :id="item.id"
                        @mousedown="itemClick(index1, index, item.id, item)"
                        @touchstart="itemClick(index1, index, item.id, item)"
                        :style="getItemStyle(item)"
                    >
                        <img
                            :src="item.icon"
                            v-if="item.icon !== ''"
                            :style="getIconStyle()"
                            :class="
                                getClass('chart-content-item-icon', 'radius')
                            "
                        />
                        <div
                            :style="getIconStyle('text')"
                            v-if="item.icon == ''"
                            :class="
                                getClass('chart-content-item-icon', 'radius')
                            "
                        >
                            {{ item.text[0] }}
                        </div>
                        <div class="chart-content-item-text">
                            {{ item.text }}
                        </div>
                    </div>
                    <div
                        class="chart-content-line"
                        :style="getLineStyle(index, index1, 'right')"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "JFlowChart",
    props: {
        chartData: {
            type: Object,
            default: {
                title: "", //标题
                dragAble: false, //是否可拖拽
                width: 0, //每个item的宽度
                data: [],
                radius: false //图标是否圆角
            }
        }
    },
    data() {
        return {
            itemWidth: 0,
            itemNum: 0,
            chartDataList: [],
            vChartDataList: [],
            operateDom: null,
            operateDomNum: null,
            startX: "",
            startY: "",
            oldInd: null,
            selectedItem: {}
        };
    },
    created() {},
    mounted() {
        this.initPage();
    },
    methods: {
        initPage() {
            this.vChartDataList = [...this.chartData.data];
            //是否可拖拽
            if (this.chartData.dragAble) {
                document
                    .getElementById("flow-chart")
                    .addEventListener("mouseup", this.handleMouseup);
                document
                    .getElementById("flow-chart")
                    .addEventListener("mouseover", this.handleMouseover);
                document
                    .getElementById("flow-chart")
                    .addEventListener("touchend", this.handleMouseup);
                document
                    .getElementById("flow-chart")
                    .addEventListener("touchmove", this.handleMouseover);
            }
            this.preventEvent();
            this.initStyle();
            this.initData();
            window.onresize = this.onReSize;
        },
        //阻止默认事件
        preventEvent() {
            document.getElementById("flow-chart").ondragstart = function() {
                return false;
            };
            document.getElementById("flow-chart").onselectstart = function() {
                return false;
            };
        },
        //监听页面尺寸变化
        onReSize(event) {
            this.initData();
            this.initStyle();
        },
        //鼠标抬起时
        handleMouseup(event) {
            const chartContent = document.getElementById("chartContent");
            const dom = document.getElementById("moveDiv");
            const w = chartContent.offsetWidth,
                h = chartContent.offsetHeight,
                l = chartContent.offsetLeft,
                t = chartContent.offsetTop;
            const x = event.pageX,
                y = event.pageY;
            dom.style.visibility = "hidden";
            // if(x > l && x < (l + w) && y > t && y < (t + h)){

            // }else{

            // }
            if (this.vChartDataList[this.oldInd])
                this.vChartDataList[this.oldInd].opacity = 1;
            chartContent.style.border = "none";
            this.operateDom = null;
            this.operateDomNum = null;
            this.oldInd = null;
        },

        handleMouseover(event) {
            if (this.vChartDataList.length < this.chartData.data.length) {
                this.vChartDataList.unshift({ ...this.chartData.data[0] });
            }
            if (this.operateDom != null) {
                const w = this.operateDom.offsetWidth,
                    h = this.operateDom.offsetHeight;
                let x = event.pageX,
                    y = event.pageY;
                this.operateDom.style.position = "fixed";
                this.operateDom.style.opacity = "0.5";
                this.operateDom.style.left = x - w / 2 - window.scrollX + "px";
                this.operateDom.style.top = y - h / 2 - window.scrollY + "px";
                let { tx, ty } = this.getItemCoords(x, y);
                let oldInd = this.oldInd;
                if (oldInd >= 0) {
                    this.vChartDataList.splice(oldInd, 1);
                    this.initData();
                }
                let nty =
                    parseInt(ty) % 2 == 0
                        ? parseInt(tx)
                        : this.itemNum - parseInt(tx);
                nty = Math.min(nty, this.itemNum);
                nty = Math.max(nty, 0);
                oldInd = parseInt(ty) * this.itemNum + nty;
                oldInd = Math.min(this.chartData.data.length - 1, oldInd);
                oldInd = Math.max(0, oldInd);
                this.oldInd = oldInd;
                if (oldInd < 0) return;
                this.vChartDataList.splice(oldInd, 0, { ...this.selectedItem });
                this.initData();
            }
        },
        //获取当前移动到的坐标
        getItemCoords(x, y) {
            let d = document.getElementById("chartContent");
            let left = d.offsetLeft;
            let top = d.offsetTop;
            (x = x - left), (y = y - top);
            let itemNum = this.itemNum;
            let w = d.offsetWidth;
            let h = d.offsetHeight;
            let moveDiv = document.getElementById("moveDiv");
            let th = moveDiv.offsetHeight;
            w = Math.ceil(w / itemNum);
            (x = Math.floor(x / w)), (y = Math.floor(y / th));
            return { tx: x, ty: y };
        },
        //item点击事件
        itemClick(index1, index, id, item) {
            if (!this.chartData.dragAble) return;
            this.selectedItem = { ...item };
            this.selectedItem.opacity = "0.5";
            let num = parseInt(id.split("-")[2]);
            let dom = document.getElementById("moveDiv");
            let dom1 = document.getElementById(id); //展示的节点
            let d = document.getElementById("chartContent");
            d.style.border = "dashed 1px blue";
            // this.vChartDataList.splice(num,1);
            this.oldInd = num;
            this.initData();
            this.operateDom = dom;
            this.operateDomNum = num;
            this.startX = dom1.offsetLeft;
            this.startY = dom1.offsetTop;
            dom.style.visibility = "inherit";
            dom.style.position = "fixed";
            dom.style.left = dom1.offsetLeft;
            dom.style.top = dom1.offsetTop;
            // console.log(index1,index,num,this.vChartDataList[num].text,dom);
        },
        //初始化样式变量
        initStyle() {
            let chartContent = this.$refs.chartContent;
            let width = chartContent.offsetWidth - 40;
            let height = chartContent.offsetHeight - 40;
            let itemWidth = Math.max(20, Math.floor(width / 7));
            if (this.chartData.width) {
                itemWidth = this.chartData.width;
            }
            this.itemWidth = itemWidth;
            this.itemNum = Math.floor(width / (itemWidth + itemWidth / 5));
            // console.log('initStyle',width,height,itemWidth);
        },
        //初始化数据
        initData() {
            let data = this.vChartDataList;
            let res = [],
                flag = true,
                temp = [];
            for (let i = 1; i <= data.length; i++) {
                data[i - 1].id = "item" + "-" + res.length + "-" + (i - 1);
                if (flag) temp.push(data[i - 1]);
                else temp.unshift(data[i - 1]);
                if (i % this.itemNum == 0 || i == data.length) {
                    res.push([...temp]);
                    temp = [];
                    flag = !flag;
                }
            }
            this.chartDataList = res;
            // console.log('initData',res);
        },
        //重组class
        getClass(res, str) {
            if (this.chartData[str]) res += " " + str;
            return res;
        },
        //重组行样式
        getColumnStyle(index) {
            let res = {};
            // res['margin-left'] = this.itemWidth / 5 + 'px;';
            if (index < this.chartDataList.lenth - 1 || index % 2 == 0)
                return this.styleConcat(res);
            res["margin-left"] = "auto";
            res["margin-right"] = -this.itemWidth / 5 + "px;";
            return this.styleConcat(res);
        },
        //重组每个item的样式
        getItemStyle(item = "") {
            let res = {};
            if (item != "") {
                if (item.opacity) {
                    res.opacity = item.opacity;
                }
                return this.styleConcat(res);
            }
            res.width = this.itemWidth + "px;";
            res["margin-right"] = this.itemWidth / 5 + "px;";
            // res.height = this.itemWidth + 'px';
            return this.styleConcat(res);
        },
        //重组每个item的icon的样式
        getIconStyle(str) {
            let res = {};
            res.width = this.itemWidth - 5 + "px;";
            res.height = this.itemWidth - 5 + "px";
            if (str == "text") {
                res["line-height"] = this.itemWidth - 5 + "px";
                res["font-size"] = "large";
                res["border"] = "1px solid blue";
                res["background-color"] = "skyblue";
            }
            return this.styleConcat(res);
        },
        //获取连接线样式
        getLineStyle(index, index1, flag) {
            if (
                index1 == this.chartDataList.length - 1 &&
                index == this.chartDataList[index1].length - 1
            )
                return "";
            let res = {};
            res["border-top"] = "1px solid black";
            res.width = this.itemWidth / 3 + "px";
            if (flag == "right")
                res["margin-right"] = -this.itemWidth / 3 + "px;";
            else {
                res["margin-left"] = -this.itemWidth / 3 + "px;";
                res["border-left"] = "1px solid black";
            }
            res["margin-top"] = this.itemWidth / 2 + "px;";
            if (
                index == this.chartDataList[0].length - 1 &&
                index1 < this.chartDataList.length - 1
            ) {
                if (index1 % 2 == 0) {
                    res["border-right"] = "1px solid black";
                } else {
                }
            }
            if (index1 % 2 == 1) {
                if (index == this.chartDataList[index1].length - 1) return "";
                else {
                }
            }
            return this.styleConcat(res);
        },
        //json变量转换为style字符串
        styleConcat(obj) {
            let res = "";
            for (let k in obj) {
                res += k + ":" + obj[k] + ";";
            }
            return res;
        }
    }
};
</script>

<style lang="scss" scoped>
.chart-content-item-text {
    margin: 0 auto;
    width: 1.25rem;
    line-height: 1.5rem;
    // word-break:break-all;
}
.radius {
    border-radius: 50% 50%;
}
.flow-chart {
    width: 100%;
    .chart-title {
    }
    .chart-content {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        .chart-content-column {
            display: flex;
            flex-direction: row;
            .chart-content-item {
                display: flex;
                .chart-content-line {
                }
                .chart-content-item-icon {
                }
                .chart-content-item-text {
                    margin: 0 auto;
                    width: 1.25rem;
                    line-height: 1.5rem;
                    // word-break:break-all;
                }
            }
        }
    }
}
</style>
