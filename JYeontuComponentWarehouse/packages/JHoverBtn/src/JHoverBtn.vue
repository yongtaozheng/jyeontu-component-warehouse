<template>
    <div
        class="j-hover-btn"
        :style="getStyle()"
        id="j-hover-btn"
        @mousedown="itemClick"
    >
        {{ text }}
    </div>
</template>

<script>
import { camelTo_ } from "../../utils/strTool";
export default {
    name: "JHoverBtn",
    props: {
        bgColor: {
            type: String,
            default: "deepskyblue"
        },
        autoHide: {
            type: Boolean,
            default: true
        },
        clickDis: {
            type: Number,
            default: 10
        },
        showWidth: {
            type: Number,
            default: 15
        },
        width: {
            type: Number,
            default: 80
        },
        radius: {
            type: Boolean,
            default: true
        },
        btnStyle: {
            type: Object,
            default: () => {}
        },
        text: {
            type: String,
            default: "悬浮按钮"
        },
        zIndex: {
            type: Number,
            default: 999
        }
    },
    data() {
        return {
            startX: "",
            startY: "",
            clickStatus: false,
            isClick: true
        };
    },
    mounted() {
        this.preventEvent();
        window.addEventListener("mouseup", this.handleMouseup);
        window.addEventListener("mouseover", this.handleMouseover);
    },
    methods: {
        getStyle(res = "") {
            res += "background-color:" + this.bgColor + ";";
            res += "width:" + this.width + "px;";
            res += "height:" + this.width + "px;";
            res += "line-height:" + this.width + "px;";
            res += "z-index:" + this.zIndex + ";";
            if (this.radius) {
                res += "border-radius: 50% 50%;";
            }
            let btnStyle = this.btnStyle;
            for (let k in btnStyle) {
                res += camelTo_(k) + ":" + btnStyle[k] + ";";
            }
            return res;
        },
        //阻止默认事件
        preventEvent() {
            document.getElementById("j-hover-btn").ondragstart = function() {
                return false;
            };
            document.getElementById("j-hover-btn").onselectstart = function() {
                return false;
            };
        },
        windowPreventEvent() {
            window.ondragstart = function() {
                return false;
            };
            window.onselectstart = function() {
                return false;
            };
        },
        windowPreventEventCancel() {
            window.ondragstart = null;
            window.onselectstart = null;
        },
        itemClick(event) {
            this.startX = event.pageX - window.scrollX;
            this.startY = event.pageY - window.scrollY;
            this.clickStatus = true;
            this.windowPreventEvent();
        },
        //鼠标抬起时
        handleMouseup(event) {
            if (this.clickStatus) {
                const endX = event.pageX - window.scrollX,
                    endY = event.pageY - window.scrollY;
                if (this.isClick) {
                    this.$emit("hoverBtnClick");
                } else {
                    if (!this.autoHide) return;
                    const width = document.body.offsetWidth;
                    const height = document.body.offsetHeight;
                    const dom = document.getElementById("j-hover-btn");
                    if (endX < this.width / 2) {
                        dom.style.left = -(this.width - this.showWidth) + "px";
                    } else if (endX > width - this.width / 2) {
                        dom.style.left = width - this.showWidth + "px";
                    }
                }
                this.clickStatus = false;
                this.isClick = true;
                this.windowPreventEventCancel();
            }
        },

        handleMouseover(event) {
            if (this.clickStatus) {
                const endX = event.pageX - window.scrollX,
                    endY = event.pageY - window.scrollY;
                const dom = document.getElementById("j-hover-btn");
                if (
                    Math.abs(endX - this.startX) > this.clickDis ||
                    Math.abs(endY - this.startY) > this.clickDis
                ) {
                    this.isClick = false;
                }
                dom.style.left = endX - this.width / 2 + "px";
                dom.style.top = endY - this.width / 2 + "px";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.j-hover-btn {
    text-align: center;
    cursor: pointer;
    position: fixed;
}
</style>
