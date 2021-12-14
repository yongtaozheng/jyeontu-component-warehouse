<template>
    <div>
        <img class="head-img" src="@/assets/logo.png" />
        <div class="per-link" v-for="(item, index) in myLink" :key="item.name">
            <span class="link-name">{{ item.name }}：</span>
            <span class="link-address" @click="toAddress(item.address)">{{
                item.address
            }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "homePage",
    components: {},
    data() {
        return {
            myLink: [
                {
                    name: "CSDN",
                    address: "https://blog.csdn.net/Twinkle_sone"
                },
                {
                    name: "Gitee",
                    address: "https://gitee.com/zheng_yongtao"
                },
                {
                    name: "GitHub",
                    address: "https://github.com/yongtaozheng"
                },
                {
                    name: "掘金",
                    address: "https://juejin.cn/user/440244290727294"
                }
            ]
        };
    },
    methods: {
        toAddress(url) {
            window.open(url);
        }
    }
};
</script>

<style lang="scss" scoped>
.head-img {
    border-radius: 50% 50%;
    margin-top: 1rem;
}
.per-link {
    margin-top: 1rem;
    font-size: larger;
    .link-name {
    }
    .link-address {
        text-decoration: underline;
        text-underline: blue;
        color: blue;
        cursor: pointer;
    }
}
</style>
