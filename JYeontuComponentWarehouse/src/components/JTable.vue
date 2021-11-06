<template>
  <div>
    <table class="j-table">
      <tr class="j-table-tr j-table-title">
        <th v-for="(item,index) in title"
            :key="item.key"
            class="j-table-tr-th"
        >
          {{item.title}}
          <button v-if="item.sort"
                  @click="sortByKey(item.key,index)"
                  :title="getSortWay(item)"
          >sort</button>
        </th>
      </tr>
      <tr v-for="(item,index) in tableData"
          :key="index"
          class="j-table-tr">
        <td v-for="(item1,index1) in title"
            :key="index1"
            class="j-table-tr-td"
            :style="getStyle(item1)"
        >
          <input v-if="!item1.readOnly"
                 v-model="item[item1.key]"
                 class="j-table-tr-td-input"
          />
          <span v-else>{{item[item1.key]}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {_toLittleCamel,camelTo_} from '@/utils/strTool'
export default{
  name:'JTable',
  props:{
    title:{//表格头
      type:Array,
      default(){
        return [
          {
            title:'',//展示列名
            key:'',//字段名
            type: '', // 列类型
            readOnly:'true',//是否只读
            width:'',//列宽度
            columnStyle: '', // 列样式
            fixed: false,//是否固定
            sort: false, // 是否支持排序
            sortWay:'asc'//asc:升序,desc:降序
          }
        ];
      }
    },
    tableData:{//表格数据
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return{

    }
  },
  methods:{
    //指定列排序
    sortByKey(key,ind){
      let tableData = this.tableData;
      let title = this.title;
      // console.log(key,title[ind]);
      if(title[ind].sortWay == 'desc'){
        tableData = tableData.sort((a,b)=>{
          return b[key].localeCompare(a[key]);
        })
        title[ind].sortWay = 'asc';
      }else{
        tableData = tableData.sort((a,b)=>{
          return a[key].localeCompare(b[key]);
        })
        title[ind].sortWay = 'desc';
      }
      // console.log(tableData);
    },
    //获取当前排序方式
    getSortWay(item){
      if(item.sortWay == 'desc'){
        return '降序';
      }
      return '升序';
    },
    //初始化表格
    initTable(){
      let title = this.title;
      let th = document.getElementsByClassName('j-table-tr-th');
      // console.log('initTable',th,title);
      for(let i = 0; i < title.length; i++){
        if(title[i].width){
          th[i].style.maxWidth = title[i].width;
          th[i].style.width = title[i].width;
        }else{
          // th[i].style.width = title[i].width;
        }
        if(title[i].columnStyle){
          let style = title[i].columnStyle.split(';');
          // console.log('style',style);
          for(let item of style){
            if(item == '') break;
            item = item.split(':');
            // console.log('item',_toLittleCamel(item[0]),item[1]);
            th[i].style[_toLittleCamel(item[0])] = item[1];
          }
        }else{

        }
      }
    },
    //转化columnStyle的格式
    getStyle(item1){
      let style = item1.columnStyle.split(';');
      let res = '';
      if(item1.width != ''){
        res = 'max-width:' + item1.width + ';';
        res += 'width:' + item1.width + ';';
      }
      for(let item of style){
        if(item == '') break;
        item = item.split(':');
        res += camelTo_(item[0]) + ':' + item[1] + ';';
      }
      return res;
    }
  },
  mounted() {
    this.initTable();
  }
}
</script>

<style lang="scss" scoped>
.j-table{
  border-collapse:collapse;
  .j-table-title{

  }
  .j-table-tr{
    border-bottom: 1px solid black;
    .j-table-tr-th{
      background-color: #0EB9E5;
      border-right: 1px solid grey;
      padding: 4px 4px 4px 4px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .j-table-tr-th:last-child{
      border-right: none;
    }
    .j-table-tr-td{
      border-right: 1px solid grey;
      padding: 4px 4px 4px 4px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .j-table-tr-td-input{
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
        text-align: center;
        width: inherit;
      }
    }
    .j-table-tr-td:last-child{
      border-right: none;
    }
  }
}
</style>
