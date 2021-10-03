<template>
  <div class="tetris-content">
    <div class="content-left">
      <div v-for="(item,index) in map" :key="index" class="left-column">
        <div v-for="(item1,index1) in item"
             :key="index1"
             class="left-row"
             :class="getCellColor(item1)"
        >

        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="next-box">

      </div>
      <div class="score-box">

      </div>
      <div class="btn-box">

      </div>
    </div>
  </div>
</template>

<script>
import control from './control';
import tools from './tools';
const config = require('./config.json');
var fallDownTime;
export default {
  name: "Tetris",
  //import引入的组件需要注入到对象中才能使用",
  components: {},
  data() {
    //这里存放数据",
    return {
      map:[],
      blockList:[],
      x:0,
      y:4,
      block:[]
    };
  },
  //监听属性 类似于data概念",
  computed: {},
  //监控data中的数据变化",
  watch: {},
  //方法集合",
  methods: {
    getCellColor(item){
      if(item == 1) return 'black';
      return '';
    },
    getKeyPress(){
      let x = this.x,y = this.y,block = this.block,map = this.map;
      const that = this;
      document.onkeypress = e => {
        // console.log(window.event.keyCode);
        let keyCode = window.event.keyCode;
        if(keyCode == 97 && y > 0){
          // console.log('向左');
          // move('left');
        }else if(keyCode == 100 && y + block[0].length < map[0].length){
          // console.log('向右');
          // move('right');
        }else if(keyCode == 115){
          // console.log('向下');
        }else if(keyCode == 119){
          // console.log('向上');
          that.changeBlock();
        }
      }
    },
    //
    changeBlock(){
      let x = this.x,y = this.y;
      let block = this.block;
      clearTimeout(fallDownTime);
      this.reflesh(block,x,y,true);
      block = control.changeBlock(block);
      this.block = block;
      this.reflesh(block,x,y,false);
      this.fallDownBlock(block);
    },
    //初始化游戏数据
    initGame(){
      console.log("initGame");
      this.map = [...config.map];
      this.blockList = [...config.blockList];
      this.fallTime = config.fallTime;
    },
    startGame(){
      let block = this.generatorBlock();
      this.fallDownBlock(block);
    },
    //随机生成方块
    generatorBlock(){
      //随机选取
      let randomNum = tools.randomNum(0,this.blockList.length - 1);
      let block = this.blockList[0];
      block = control.changeBlock(block);
      this.block = block;
      return block;
    },
    //重新渲染页面
    reflesh(block,x,y,flag){
      let map = [...this.map];
      for(let i = 0; i < block.length; i++){
        for(let j = 0; j < block[i].length; j++){
          if(flag)  map[x + i][y + j] = 0;
          else map[x + i][y + j] = block[i][j];
        }
      }
      this.map = map;
    },
    //方块下落
    fallDownBlock(block){
      let x = this.x,y = this.y;
      this.reflesh(block,x,y,true);
      x++;
      this.x = x;
      this.reflesh(block,x,y,false);
      if(x < this.map.length - block.length){
        fallDownTime = setTimeout(()=>{
          this.fallDownBlock(block);
        },1000);
      }
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {

  },

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {
    this.initGame();
  },
  //生命周期 - 挂载之前",html模板未渲染
  beforeMount() {

  },

  //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted() {
    this.startGame();
    this.getKeyPress();
  },

  //生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate() {

  },
  //生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated() {

  },
  //生命周期 - 销毁之前",
  beforeDestroy() {

  },
  destroyed() {

  },
  //生命周期 - 销毁完成",
  //如果页面有keep-alive缓存功能，这个函数会触发",
  activated() {

  },
}
</script>

<style lang="scss" scoped>
  .black{
    background-color: black;
  }
  .tetris-content{
    margin: auto auto;
    margin-top: 1rem;
    display: flex;
    border: black 1px solid;
    height: 70vh;
    width: 50vw;
    .content-left{
      width: 70%;
      .left-column{
        display: flex;
        height: calc(100% / 12 - 1px);
        border-bottom: black 1px solid;
        .left-row{
          border-right: black 1px solid;
          width: calc(100% / 12);
        }
      }
      .left-column:last-child{
        height: calc(100% / 12);
        border-bottom: none;
      }
    }
  }
</style>
