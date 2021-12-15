<template>
    <div class="template">
        <div id="header" class="header">
            <div class="header-title">{{ title }}</div>
            <div class="btn-list">
                <div class="btn-list-left">
                    <div class="btn-pre" @click="toPreMonth()"><</div>
                    <div class="select-month">{{ selectMonth }}</div>
                    <div class="btn-next" @click="toNextMonth()">></div>
                </div>
                <div class="btn-today" @click="toNowDay()">回到今天</div>
            </div>
        </div>
        <div class="content" id="content">
            <div class="calendar-content">
                <div
                    class="grid-week grid"
                    v-for="(item, index) in weeks"
                    :key="index"
                >
                    周{{ item }}
                </div>
                <div
                    @click="clickDay(item)"
                    class="grid-day grid"
                    :class="gridClass(item)"
                    v-for="(item, index) in days"
                    :key="index"
                >
                    {{ item.split("-")[2] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "JCalendar",
    props: {
        title: {
            type: String,
            default: "日历"
        },
        bgSrc: {
            type: String,
            default: "https://images8.alphacoders.com/992/992329.jpg"
        }
    },
    data() {
        return {
            weeks: ["日", "一", "二", "三", "四", "五", "六"],
            days: [],
            selectDay: "",
            selectMonth: ""
        };
    },
    methods: {
        gridClass(item) {
            if (item == this.selectDay) {
                return "selected";
            }
            if (item.split("-")[1] != this.selectMonth.split("-")[1]) {
                return "gray";
            }
            return "";
        },
        setBg() {
            let src = this.bgSrc;
            let box = document.getElementById("header");
            box.style.backgroundImage = "url(" + src + ")";
            box.style.backgroundRepeat = "no-repeat";
            box.style.backgroundSize = "100%";
        },
        /**
         * 判断润年
         * @param {string} year 需要判断的年份
         * @return {Boolean}
         */
        isLeap(year) {
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                return true;
            }
            return false;
        },
        /**
         * 获取星期
         * @param {string} date 需要获取星期的日期
         * @return {string}
         */
        getWeek(date) {
            let Stamp = new Date(date);
            // return weeks[Stamp.getDay()];
            return Stamp.getDay();
        },
        /**
         * 获取月份天数
         * @param {string} year  年份
         * @param {string} month 月份
         * @return {string}
         */
        getMonthDays(year, month) {
            month = parseInt(month) - 1;
            if (month < 0 || month > 11) return "";
            let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (this.isLeap(year)) {
                months[1] = 29;
            }
            return months[month];
        },
        zero(str) {
            str = parseInt(str);
            return str > 9 ? str : "0" + str;
        },
        /**
         * 补充满天数
         * @param {string} year  年份
         * @param {string} month 月份
         * @return {string}
         */
        fillDays(year, month) {
            const months = this.getMonthDays(year, month);
            const startWeek = this.getWeek(year + "-" + month + "-" + "01");
            const endWeek = this.getWeek(year + "-" + month + "-" + months);
            this.selectMonth = year + "-" + this.zero(month);

            year = parseInt(year);
            month = parseInt(month);
            let preYear = year;
            let preMonth = month - 1;
            if (preMonth === 0) {
                preMonth = 12;
                preYear = parseInt(year) - 1;
            }
            const preMonths = this.getMonthDays(preYear, preMonth);
            let nextYear = year;
            let nextMonth = month + 1;
            if (nextMonth === 13) {
                nextMonth = 1;
                nextYear = parseInt(year) + 1;
            }
            // const nextMonths = this.getMonthDays(nextYear, nextMonth)
            let days = [];
            for (let i = 0; i < startWeek; i++) {
                days.unshift(
                    preYear +
                        "-" +
                        this.zero(preMonth) +
                        "-" +
                        this.zero(preMonths - i)
                );
            }
            for (let i = 1; i <= months; i++) {
                days.push(year + "-" + this.zero(month) + "-" + this.zero(i));
            }
            for (let i = 0; i < 6 - endWeek; i++) {
                days.push(
                    nextYear +
                        "-" +
                        this.zero(nextMonth) +
                        "-" +
                        this.zero(i + 1)
                );
            }
            return days;
        },
        clickDay(day) {
            let clickMonth = parseInt(day.split("-")[1]),
                selectMonth = parseInt(this.selectMonth.split("-")[1]);
            if (clickMonth == selectMonth - 1) {
                this.toPreMonth();
            }
            if (clickMonth == selectMonth + 1) {
                this.toNextMonth();
            }
            this.selectDay = day;
            this.$emit("selectDay", day);
        },
        toNowDay() {
            let tempDate = new Date();
            let year = tempDate.getFullYear();
            let month = this.zero(tempDate.getMonth() + 1);
            let day = this.zero(tempDate.getDate());
            this.days = this.fillDays(year, month);
            this.clickDay(year + "-" + month + "-" + day);
        },
        toPreMonth() {
            let year = this.selectMonth.split("-")[0];
            let month = this.selectMonth.split("-")[1];
            month = parseInt(month) - 1;
            if (month === 0) {
                month = 12;
                year = parseInt(year) - 1;
            }
            this.days = this.fillDays(year, month);
            this.$emit("changeMonth", year + "-" + this.zero(month));
        },
        toNextMonth() {
            let year = this.selectMonth.split("-")[0];
            let month = this.selectMonth.split("-")[1];
            month = parseInt(month) + 1;
            if (month === 13) {
                month = 1;
                year = parseInt(year) + 1;
            }
            this.days = this.fillDays(year, month);
            this.$emit("changeMonth", year + "-" + this.zero(month));
        }
    },
    mounted() {
        this.toNowDay();
        this.setBg();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media screen and (max-width: 500px) {
    .header {
        height: calc(100vw * 9 / 16);
    }
    .select-month {
        flex: 2;
        font-size: medium !important;
        font-weight: bold !important;
    }
}
.header {
    display: flex;
    flex-direction: column;
    .header-title {
        line-height: 5rem;
        font-size: larger;
        font-weight: bold;
    }
    .btn-list {
        display: flex;
        padding: 1rem;
        margin-top: auto;
        cursor: pointer;
        .btn-list-left {
            padding: 0.5rem;
            width: 40%;
            display: flex;
            .select-month {
                color: black;
                flex: 2;
                font-size: larger;
                font-weight: bolder;
            }
            .btn-pre {
                flex: 1;
                background-color: #0080ff;
            }
            .btn-next {
                flex: 1;
                background-color: #0080ff;
            }
        }
        .btn-today {
            padding: 0.5rem;
            margin-left: auto;
            margin-right: 1rem;
            background-color: #076678;
            color: white;
        }
    }
}
.calendar-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .selected {
        background-color: #007faa;
    }
    .grid {
        width: calc((100% - 9px) / 7);
        height: 3rem;
        line-height: 3rem;
        border-left: #005599 solid 1px;
        border-bottom: #005599 solid 1px;
    }
    .grid-week {
        border-top: #005599 solid 1px;
        background-color: skyblue;
    }
    .grid-day {
        cursor: pointer;
    }
    .grid-week:nth-child(7) {
        border-right: #005599 solid 1px;
    }
    .grid-day:nth-child(14) {
        border-right: #005599 solid 1px;
    }
    .grid-day:nth-child(21) {
        border-right: #005599 solid 1px;
    }
    .grid-day:nth-child(28) {
        border-right: #005599 solid 1px;
    }
    .grid-day:nth-child(35) {
        border-right: #005599 solid 1px;
    }
    .grid-day:nth-child(42) {
        border-right: #005599 solid 1px;
    }
    .gray {
        background-color: slategrey;
    }
}
</style>
