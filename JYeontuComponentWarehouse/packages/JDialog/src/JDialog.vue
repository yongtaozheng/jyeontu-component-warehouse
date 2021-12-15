<template>
    <div class="j-dialog">
        <div class="mask" v-if="JDialogIsShow" @click="maskClick()"></div>
        <div class="j-dialog-content" v-if="JDialogIsShow">
            <div class="j-dialog-header">
                <div class="j-dialog-header-title">
                    <span class="title">{{ title }}</span>
                    <span
                        class="j-dialog-header-icon"
                        @click="closeDialog()"
                        title="关闭"
                        >x</span
                    >
                </div>
            </div>
            <div class="j-dialog-main">
                <slot name="j-dialog-main-content"></slot>
            </div>
            <div class="j-dialog-footer">
                <div class="j-dialog-footer-btn">
                    <div
                        v-for="(item, index) in btnList"
                        :key="index"
                        class="btn"
                        :style="getStyle(item.style)"
                        @click="doClick(item.click)"
                        :title="item.text"
                    >
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <button @click="showDialog()">点我</button>
    </div>
</template>

<script>
import { camelTo_ } from "../../utils/strTool";
export default {
    name: "JDialog",
    props: {
        title: {
            type: String,
            default: "我是标题"
        },
        closable: {
            type: Boolean,
            default: false
        },
        btnList: {
            type: Array,
            default: () => [
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
                    }
                }
            ]
        }
    },
    data() {
        return {
            JDialogIsShow: false
        };
    },
    methods: {
        getStyle(obj) {
            console.log(obj);
            let res = "";
            for (let k in obj) {
                res += camelTo_(k) + ":" + obj[k] + ";";
            }
            console.log(res);
            return res;
        },
        doClick(flag = "") {
            if (flag == "close") {
                this.closeDialog();
            }
            this.$emit(flag);
        },
        maskClick() {
            this.JDialogIsShow = !this.closable;
        },
        showDialog() {
            this.JDialogIsShow = true;
        },
        closeDialog() {
            this.JDialogIsShow = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.j-dialog {
    display: auto;
    .mask {
        background-color: dimgrey;
        opacity: 0.7;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        top: 0;
        left: 0;
    }
    .j-dialog-content {
        background-color: whitesmoke;
        width: 60vw;
        position: fixed;
        top: 20vh;
        left: 20vw;
        z-index: 1000;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .j-dialog-header {
            border-bottom: 1px solid dimgrey;
            height: 3rem;
            line-height: 3rem;
            text-align: left;
            padding-left: 1rem;
            .j-dialog-header-title {
                .title {
                    font-weight: bold;
                }
                .j-dialog-header-icon {
                    // border: solid 1px black;
                    float: right;
                    height: 20px;
                    width: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    font-size: large;
                    margin-right: 0.5rem;
                    margin-top: 0.3rem;
                    color: red;
                    cursor: pointer;
                }
            }
        }
        .j-dialog-main {
            min-height: 20vh;
        }
        .j-dialog-footer {
            border-top: 1px solid dimgrey;
            height: 2rem;
            padding: 0.3rem;
            .j-dialog-footer-btn {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                .btn {
                    padding-top: 0.2rem;
                    padding-bottom: 0.2rem;
                    padding-left: 0.3rem;
                    padding-right: 0.3rem;
                    text-align: center;
                    font-weight: bold;
                    cursor: pointer;
                }
                .confirm-btn {
                    background-color: seagreen;
                }
                .cancel-btn {
                    background-color: orangered;
                }
            }
        }
    }
}
</style>
