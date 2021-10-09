<template>
  <div class="content">
    <electronicNumber
        :numbers="numbers"
        :number-color="numberColor"
        :number-size="numberSize"
    >
    </electronicNumber>
  </div>
</template>
<script>
import electronicNumber from '@/components/electronicNumber'
import { getToday } from '@/utils/dateTool'
export default {
  name:'electronicNumbers',
  components:{
    electronicNumber
  },
  data(){
    return {
      numbers:[],
      numberColor:'#8076a3',
      numberSize:'1rem'
    }
  },
  mounted(){
    this.getTime();
  },
  methods:{
    getTime(){
      let day = getToday('yyyy-mm-dd hh:MM:ss');
      this.numbers = [day];
      setTimeout(()=>{
        this.getTime();
      },1000);
    }
  }
}
</script>
<style scoped lang="scss">
  .content{
    margin:auto auto;
    width: 50%;
  }
</style>
