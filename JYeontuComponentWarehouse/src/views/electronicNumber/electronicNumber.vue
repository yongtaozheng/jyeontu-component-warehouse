<template>
  <div class="content">
    <electronicNumber
        :numbers="numbers"
        :numberColor="numberColor"
        :numberSize="numberSize"
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
      numberSize:'3rem'
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
