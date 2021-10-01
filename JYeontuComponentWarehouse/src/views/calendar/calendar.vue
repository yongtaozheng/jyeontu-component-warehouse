<template>
  <div class="content">
    <JYeontuCalendar
        :title="title"
        :bgSrc="bgSrc"
        @selectDay="selectDay"
        @changeMonth="changeMonth"
    >
    </JYeontuCalendar>
  </div>
</template>
<script>
import JYeontuCalendar from '@/components/JYeontuCalendar'
export default {
  name:'calendar',
  components:{
    JYeontuCalendar
  },
  data(){
    return {
      title:"JYeontu的日历",
      bgSrc:"https://images8.alphacoders.com/992/992329.jpg"
    }
  },
  methods:{
    selectDay(e){
      // console.log(e);
    },
    changeMonth(e){
      // console.log(e);
    }
  }
}
</script>
<style scoped lang="scss">
  .content{
    //width: 100%;
  }
</style>
