<template>
    <div id="topMenu">
        <j-electronic-number
            :numbers="numbers"
            :number-color="numberColor"
            :number-size="numberSize"
            class="electronic-number"
        >
        </j-electronic-number>
        <span id="username" class="username">JYeontu</span>
        <img class="avatar" src="../../assets/logo.png" alt="" />
    </div>
</template>

<script>
import { getToday } from "@/utils/dateTool";
export default {
    name: "topMenu",
    components: {},
    data() {
        return {
            numbers: [],
            numberColor: "pink",
            numberSize: "0.6rem"
        };
    },
    methods: {
        getTime() {
            let day = getToday("yyyy-mm-dd hh:MM:ss");
            this.numbers = [day];
            setTimeout(() => {
                this.getTime();
            }, 1000);
        }
    },
    created() {
        this.getTime();
    },
    mounted() {
        const username = document.getElementById("username");
        username.innerHTML = username.textContent.replace(
            /\S/g,
            "<span>$&</span>"
        );
        document.querySelectorAll("span").forEach((span, index) => {
            span.style.setProperty("--delay", `${index * 0.1}s`);
        });
    }
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    // float: right;
    margin: 10px;
}

.username {
    // float: right;
    line-height: 60px;
    margin-right: 20px;
    color: white;
    font-size: 1rem;
}

#topMenu {
    background-color: #111827;
    min-width: 100vw;
    height: 60px;
    display: -webkit-flex;
    align-items: center;
    flex-direction: row-reverse;
    z-index: 99;
}

@keyframes blink {
    0%,
    100% {
        color: inherit;
    }
    50% {
        color: #b9e769;
    }
}

#topMenu #username span {
    display: inline-block;
    animation-name: blink;
    /*取出style中的--delay属性值*/
    /*animation-delay: var(--delay);*/
    animation-timing-function: ease-in-out;
    animation-duration: 0.4s;
}
.electronic-number {
    // float: right;
    line-height: 60px;
    margin-right: 4rem;
}
</style>
