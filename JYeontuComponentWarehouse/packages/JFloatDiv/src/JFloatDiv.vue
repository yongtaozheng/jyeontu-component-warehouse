<template>
    <div>
        {{ text }}
        <div id="float-content">
            我是图片
        </div>
    </div>
</template>

<script>
export default {
    name: "JFloatDiv",
    data() {
        return {
            text: "我是文字"
        };
    },
    created() {
        this.textReapt();
    },
    methods: {
        textReapt() {
            let i = 8;
            while (i--) this.text += this.text;
        }
    }
};
</script>

<style lang="scss" scoped>
#float-content {
    width: 200px;
    height: 200px;
    background-color: cadetblue;
    float: left;
}
</style>
