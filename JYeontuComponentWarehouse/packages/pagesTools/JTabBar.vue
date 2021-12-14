<template>
    <div class="j-tab-bar">
        <div class="bar-items">
            <div
                v-for="(item, index) in tabList"
                :key="item.id"
                :class="getBarClass(index, 'bar-item')"
                :title="item.label"
                @click="barClick(index)"
            >
                {{ item.label }}
            </div>
        </div>
        <div v-for="(item, index) in tabList" :key="item.id">
            <slot v-if="item.id == tabList[showTab].id" :name="item.id"> </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "JTabBar",
    props: {
        tabList: {
            type: Array,
            default: [
                {
                    label: "tab",
                    id: "tab"
                },
                {
                    label: "tab1",
                    id: "tab1"
                }
            ]
        },
        defaultShowTab: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            showTab: 0
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.showTab = this.defaultShowTab;
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
.j-tab-bar {
    .bar-items {
        display: flex;
        flex-direction: row;
        line-height: 2rem;
        .bar-item {
            flex: 1;
            color: black;
            border: 1px solid deepskyblue;
            cursor: pointer;
        }
        .active-tab {
            color: cadetblue;
        }
    }
}
</style>
