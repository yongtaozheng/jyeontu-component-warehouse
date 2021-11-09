<template>
  <div id="code-height-light" class="code-height-light">
    <input id="copy_content" type="text" value=""  style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"/>
    <div class="content">
      <div class="content-head" :icon="icon" @click="doShowCode()">
        <span class="content-head-text">
          {{isCodeShow ? "收起代码" : "查看代码"}}
        </span>
      </div>
      <div class="content-body" v-show="isCodeShow">
        <span class="code-copy" @click="copyCode()">复制代码</span>
		<pre id="content-code-html" class="content-code-html"></pre>
        <pre id="content-code" class="content-code">

        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "codeHeightLight",
  //import引入的组件需要注入到对象中才能使用",
  components: {},
  props: {
    code: {
      type: String,
      default: ""
    },
    color:{
      type: Object,
      default: {
        keyWordColor:'orange',
        varWordColor:'purple',
        tagWordColor:'#F9273F',
        strWordColor:'green',
        attrWoedColor:'green',
        attrValueColor:'yellow'

      }
    }
  },
  data() {
    //这里存放数据",
    return {
      icon:'>',
      isCodeShow:true,
      showCode:'',
	    htmlCode:''
    };
  },
  //监听属性 类似于data概念",
  computed: {},
  //监控data中的数据变化",
  watch: {},
  //方法集合",
  methods: {
    doShowCode(){
      if(this.isCodeShow){
        this.isCodeShow = false;
        this.icon = ">";
      }else{
        this.isCodeShow = true;
        this.icon = "∨";
      }
    },
    copyCode(){
      //获取点击的值
      var clickContent = this.code;
      //获取要赋值的input的元素
      var inputElement =  document.getElementById("copy_content");
      //给input框赋值
      inputElement.value = clickContent;
      //选中input框的内容
      inputElement.select();
      // 执行浏览器复制命令
      document.execCommand("Copy");
      //提示已复制
      alter('已复制');
    },
	t(str){
		console.log('aaa'+str);
		return 'aaa' + str;
	},
	getColor(type,str){
		let res = '';
		let color = this.color;
		res = '<span style="color:'+ color[type] +'">'+ str +'</span>';
		return res;
	},
    replaceKeyWord(){
	  console.log('replaceKeyWord');
      let colors = this.color;
	  const contentCodeHtml = document.getElementById('content-code-html');
      let showCode = this.code;
      //html标签
      let htmlReg = /.*<.*>(.|[\r\n])*<.*>/g;
	  let textCode = showCode.match(htmlReg);
	  textCode = textCode.join('\n');
	  // console.log('textCode',textCode);

	  let tagReg = /((<)([a-zA-Z](-*[a-zA-Z])+)(.*)(>))|((<\/)([a-zA-Z](-*[a-zA-Z])+)(>))/g
	  textCode = textCode.replace(tagReg,(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10) => {
		  let res = '';
		  if(s4 == undefined) return '<span>' + s1 + '</span>';
		  res += '<span><<span>' + this.getColor('tagWordColor',s4) + ' ';
		  let flag = false;
		  let text = s6.match(/>(.*)</);
		  if(text && text.length > 1){
			  text = text[1];
		  }else{
			  text = '';
		  }
		  s6 = s6.split('></');
		  // if(s6.length > 1) flag = true;
		  s6 = s6[0];
		  s6 = s6.split(' ');
		  for(let i = 0; i < s6.length; i++){
			  if(s6[i] !== ''){
				  let t = s6[i].split('=');
				  if(t.length == 2){
					  res += this.getColor('attrWoedColor',t[0]);
					  res += '=';
					  res += this.getColor('attrValueColor',t[1]);
					  res += ' ';
				  }
			  }
		  }
		  res += '<span>>' + text + '<</span>/' + this.getColor('tagWordColor',s4) + '<span>></span>';
		  return(res);
	  })
	  contentCodeHtml.innerHTML = textCode;

      showCode = showCode.replace(new RegExp(htmlReg,'g'),"");
	  // showCode = showCode.replace(/[\n]/g,'<br/>')
      //字符串
      let regStr = '\'(.*)\'';
      showCode = showCode.replace(new RegExp(regStr,'g'),"<span style='color: " + colors.strWordColor + "'>'$1'</span>");
      //js关键字
      let keyWord = ['import','from','require','let','var','const','this','true','false'];
      for(let i = 0; i < keyWord.length; i++){
        let regKeyWord = '('+ keyWord[i] + ')';
        showCode = showCode.replace(new RegExp(regKeyWord,'g'),"<span style='color: " + colors.keyWordColor + "'>$1</span>");
        // console.log('------',reg,keyWord[i],code);
      }
      //变量名
      // let varReg = '( .+)(:)({|\[|<span style=)';
	  let varReg = /(?!color)( [a-zA-Z]+):/g
	  // console.log(showCode.match(varReg,'g'));
      showCode = showCode.replace(varReg,"<span style='color: " + colors.varWordColor + "'>$1</span>:");
	  //greyWords
	  showCode = showCode.replace(/(\/\/.*)|(\/\*.*([\r\n].*)*\*\/)/g,"<span style='color:grey'>$1$2</span>")

      this.showCode = showCode;
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {
  },

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {

  },
  //生命周期 - 挂载之前",html模板未渲染
  beforeMount() {

  },

  //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted() {
    let contentCode = document.getElementById('content-code');
    this.replaceKeyWord();
    contentCode.innerHTML = this.showCode;
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
  .content{
    .content-head{
      background-color: grey;
      height: 2rem;
      .content-head-text{
        line-height: 2rem;
      }
      &:after{
        content: attr(icon);
        color: black;
        position: relative;
        float: right;
        font-size: x-large;
        margin-right: 10px;
        line-height: 2rem;
      }
    }
    .content-body{
      height: 400px;
      overflow: scroll;
      .code-copy{
        cursor: pointer;
        color: white;
        float: right;
        padding: 0.2rem 0.5rem;
      }
	  #content-code-html{
        text-align: left;
        margin:0 auto;
        background-color: #111827;
        color: white;
		padding-top: 1.5rem;
	  }
      #content-code{
        text-align: left;
        margin:0 auto;
        background-color: #111827;
        color: white;
        .orange{
          color: orange;
        }
      }
    }
  }
</style>
