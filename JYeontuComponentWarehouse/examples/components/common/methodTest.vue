<template>
    <div>
        <div class="method-test-box" :key="index">
            <div class="method-item method-name">
                <span class="title-sm">方法：</span>
                <j-drop-drow-box
                    :selectData="methodList"
                    @selectItem="selectMethod"
                    :readOnly="true"
                >
                </j-drop-drow-box>
            </div>
            <div class="method-item method-params">
                <span class="title-sm">参数：</span>
                <div class="params">
                    <div
                        v-for="(param, index1) in methodParams"
                        :key="index1"
                        class="param"
                    >
                        <j-drop-drow-box
                            :selectData="changeOption(param.options)"
                            v-if="param.options"
                            @selectItem="selectParam"
                            @selectIndexValue="selectIndexValue"
                            :defIndex="index1"
                            :title="param.name"
                            :placeholder="param.name"
                        >
                        </j-drop-drow-box>
                        <input
                            v-else
                            :title="param.name"
                            :placeholder="param.name"
                            @input="bindInput"
                            style="min-width: 195px;"
                            v-model="param.value"
                        />
                    </div>
                </div>
            </div>
            <div class="method-rep method-item">
                <span
                    ><span class="title-sm">表达式：</span
                    ><span class="method-rep-span">{{ methodRep }}</span></span
                >
            </div>
            <div class="method-item method-btn">
                <button class="btn" @click="doTestCode()">点击调用</button>
            </div>
            <div class="method-item method-result">
                <span
                    ><span class="title-sm">结果：</span
                    ><span class="method-result-span">{{ result }}</span></span
                >
            </div>
        </div>
    </div>
</template>

<script>
import JDropDrowBox from "./JDropDownBox.vue";
var dateTool = require("@/utils/dateTool.js");
var numsFormat = require("@/utils/numsFormat.js");
var strTool = require("@/utils/strTool.js");
export default {
    name: "methodTest",
    props: {
        util: require("@/utils/dateTool.js"),
        methodData: {
            type: Array,
            default: []
        }
    },
    components: {
        JDropDrowBox
    },
    data() {
        return {
            methodList: [],
            methodParams: [],
            chooseMethod: "",
            chooseParams: [],
            result: "",
            methodRep: ""
        };
    },
    watch: {
        chooseMethod(val) {
            if (val >= 0) {
                let methodParams = this.methodData[val].params;
                this.methodParams = methodParams;
                this.methodRep = this.util + "." + this.methodList[val].value;
                let p = "";
                for (let i = 0; i < methodParams.length; i++) {
                    if (methodParams[i].value != "") {
                        if (i > 0) p += ",";
                        p += "'" + methodParams[i].value + "'";
                    }
                }
                this.methodRep += "(" + p + ")";
            } else {
                this.methodRep = "";
            }
        }
    },
    created() {
        let methodData = this.methodData;
        // this.methodRep = this.util + '.' + this.methodList[val].value + '(' + ')';
        for (let i = 0; i < methodData.length; i++) {
            this.methodList.push({
                id: i,
                value: methodData[i].name
            });
        }
    },
    methods: {
        bindInput() {
            let methodList = this.methodList,
                chooseMethod = this.chooseMethod,
                methodParams = this.methodParams;

            this.methodRep = this.util + "." + methodList[chooseMethod].value;
            let p = "";
            for (let i = 0; i < methodParams.length; i++) {
                if (methodParams[i].value != "") {
                    if (i > 0) p += ",";
                    p += "'" + methodParams[i].value + "'";
                }
            }
            if (p.length > 0) {
                this.methodRep += "(" + p + ")";
            }
        },
        selectParam(val) {
            this.chooseParams = val;
        },
        selectIndexValue(index, val) {
            this.methodParams[index].value = val;

            let methodList = this.methodList,
                chooseMethod = this.chooseMethod,
                methodParams = this.methodParams;

            this.methodRep = this.util + "." + methodList[chooseMethod].value;
            let p = "";
            for (let i = 0; i < methodParams.length; i++) {
                if (methodParams[i].value != "") {
                    if (i > 0) p += ",";
                    p += "'" + methodParams[i].value + "'";
                }
            }
            if (p.length > 0) {
                this.methodRep += "(" + p + ")";
            }
        },
        selectMethod(val) {
            this.chooseMethod = val;
        },
        changeOption(options) {
            let res = [];
            for (let i = 0; i < options.length; i++) {
                res.push({
                    id: i,
                    value: options[i]
                });
            }
            return res;
        },
        doTestCode() {
            let methodList = this.methodList,
                chooseMethod = this.chooseMethod,
                methodParams = this.methodParams;

            if (methodParams.length == 2 && methodParams[1].value != "") {
                if (this.util == "dateTool")
                    this.result = dateTool[methodList[chooseMethod].value](
                        methodParams[0].value,
                        methodParams[1].value
                    );
                else if (this.util == "numsFormat")
                    this.result = numsFormat[methodList[chooseMethod].value](
                        methodParams[0].value,
                        methodParams[1].value
                    );
                else if (this.util == "strTool")
                    this.result = strTool[methodList[chooseMethod].value](
                        methodParams[0].value,
                        methodParams[1].value
                    );
            } else if (methodParams[0].value != "") {
                if (this.util == "dateTool")
                    this.result = dateTool[methodList[chooseMethod].value](
                        methodParams[0].value
                    );
                else if (this.util == "numsFormat")
                    this.result = numsFormat[methodList[chooseMethod].value](
                        methodParams[0].value
                    );
                else if (this.util == "strTool")
                    this.result = strTool[methodList[chooseMethod].value](
                        methodParams[0].value
                    );
            } else {
                if (this.util == "dateTool")
                    this.result = dateTool[methodList[chooseMethod].value]();
                else if (this.util == "numsFormat")
                    this.result = numsFormat[methodList[chooseMethod].value]();
                else if (this.util == "strTool")
                    this.result = strTool[methodList[chooseMethod].value]();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.method-test-box {
    display: flex;
    flex-wrap: wrap;
    .method-item {
        display: flex;
        margin-right: 1rem;
        margin-top: 0.5rem;
        .title-sm {
            color: #2c9678;
        }
    }
    .method-name {
        // flex: 2;
        .name {
            color: royalblue;
        }
    }
    .method-params {
        // flex: 3;
        .params {
            display: flex;
            flex-direction: column;
            min-width: 100px;
            margin-right: 1rem;
            .param {
                margin-top: 0.2rem;
            }
        }
    }
    .method-rep {
        margin-top: 0.2rem;
        line-height: auto;
        .method-rep-span {
            border-bottom: 1px black solid;
        }
    }
    .method-btn {
        // flex: 1;
        max-height: 4rem;
    }
    .method-result {
        // flex: 3;
        .method-result-span {
            border-bottom: 1px black solid;
        }
    }
}
</style>
