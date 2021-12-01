<template>
  <div id="code-height-light" class="code-height-light">
    <input id="copy_content" type="text" value=""  style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"/>
    <div class="content">
      <div class="content-head" :icon="isCodeShow ? '∨' : '>'" @click="doShowCode()">
        <span class="content-head-text">
          {{isCodeShow ? "收起代码" : "查看代码"}}
        </span>
      </div>
	<div class="code-copy" @click="copyCode()">复制代码</div>
      <div class="content-body" v-show="isCodeShow">
		<pre id="content-code-html" class="content-code-html"></pre>
        <pre id="content-code" class="content-code"></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JCodeHeightLight",
  //import引入的组件需要注入到对象中才能使用",
  components: {},
  props: {
    code: {
      type: String,
      default: ""
    },
	keyWords:{
		type:Array,
		default:[]
	},
    color:{
      type: Object,
      default: {
        keyWord:'orange',
        varWord:'purple',
        tagWord:'#F9273F',
        strWord:'green',
        attrWord:'green',
        attrValue:'yellow',
		methodkeyWord:'#74759b',
		functionkeyWord:'#2c9678',
		note:'grey'
      }
    }
  },
  data() {
    //这里存放数据",
    return {
        icon:'>',
        isCodeShow:true,
        showCode:'',
	    htmlCode:'',
		jsKeyWord:['import','from','require','let',
					'var','const','this','true','false',
					'case','continue','double','for',
					'package','try','catch','if','while',
					'else','false','switch','export',
					'return','null','break','delete','alert','default'],
		jsKeyObj:['Array','Date','eval','function','hasOwnProperty',
				'Infinity','isFinite','isNaN','isPrototypeOf','length',
				'Math','NaN','name','Number','Object','prototype',
				'String','toString','undefined','valueOf']
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
		res = '<span style="color :'+ color[type] +'">'+ str +'</span>';
		return res;
	},
    replaceKeyWord(){
      let colors = this.color;
	  const contentCodeHtml = document.getElementById('content-code-html');
      let showCode = this.code;
      //html标签
      let htmlReg = /.*<(.|[\r\n])*>(.|[\r\n])*<.*>/g;
	  let textCode = showCode.match(htmlReg);
	  if(textCode != null){
		textCode = textCode.join('\n');
		textCode = textCode.replace(/[\r]/g,'tab缩进');
		textCode = textCode.replace(/[\n]/g,'换行符');
		let tagReg = /((<)([a-zA-Z](-*[a-zA-Z])+)(.*)(>))|((<\/)([a-zA-Z](-*[a-zA-Z])+)(>))/g
		textCode = textCode.replace(tagReg,(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10) => {
				  let res = '';
				  if(s4 == undefined) return '<span>' + s1 + '</span>';
				  res += '<span><<span>' + this.getColor('tagWord',s4) + ' ';
				  let text = s6.match(/>(.*)</);
				  if(text && text.length > 1){
					  text = text[1];
				  }else{
					  text = '';
				  }
				  s6 = s6.split(/>.*<\//);
				  s6 = s6[0];
				  s6 = s6.replace(/ *= */g,'=');
				  s6 = s6.split(' ');
				  for(let i = 0; i < s6.length; i++){
					  if(s6[i] !== ''){
						  let t = s6[i].split('=');
						  if(t.length == 2){
							  res += this.getColor('attrWord',t[0]);
							  res += ' = ';
							  res += this.getColor('attrValue',t[1]);
							  if(i < s6.length - 1) res += ' ';
						  }
					  }
				  }
				  res += '<span>>' + text + '<</span>/' + this.getColor('tagWord',s4) + '<span>></span>';
				  return(res);
		})
		textCode.replace(/(<!--)(.*)(-->)/g,"<pre ></pre>");
		textCode = textCode.replace(/换行符/g,'<br/>');
		contentCodeHtml.innerHTML = textCode;
		
		showCode = showCode.replace(new RegExp(htmlReg,'g'),"");
	  }else{
		contentCodeHtml.style.display='none';
	  }
	  
	  // showCode = showCode.replace(/[\t]/g,'\t ')
	  
      //字符串
      let regStr = '\'(.*)\'';
      showCode = showCode.replace(new RegExp(regStr,'g'),"<span style='color : " + colors.strWord + "'>'$1'</span>");
      
      //js关键字
      let keyWord = [...this.jsKeyWord];
      keyWord = keyWord.concat([...this.jsKeyObj]);
      for(let i = 0; i < keyWord.length; i++){
        let regKeyWord = '((([\\t|\\r|\\n| ])*('+ keyWord[i] + '))( |,|\\.|\\(|;))';
        showCode = showCode.replace(new RegExp(regKeyWord,'g'),"<span style='color : " + colors.keyWord + "'>$2</span>$5");
        // console.log('------',reg,keyWord[i],code);
      }
	  
	  //自定义关键字
	  let keyWords = [...this.keyWords];
	  for(let i = 0; i < keyWords.length; i++){
	    let regKeyWord = '('+ keyWords[i].value + ')';
	    showCode = showCode.replace(new RegExp(regKeyWord,'g'),"<span style='color : " + keyWords[i].color + " !important;'>$1</span>");
	  }
	  
	  //js方法
	  let functions = /([a-zA-Z0-9_]+)\(\)/g;
	  let functionKeyWord = showCode.match(functions) || [];
	  functionKeyWord = functionKeyWord.map((item) => {
							return item.slice(0,item.length - 2)
						})
	  for(let i = 0; i < functionKeyWord.length; i++){
	    let regFunctionKeyWord = '('+ functionKeyWord[i] + ')';
	    showCode = showCode.replace(new RegExp(regFunctionKeyWord,'g'),"<span style='color : " + colors.functionkeyWord + "'>$1</span>");
	  }
	  
	  let methodKeyWord = ['setTimeout','toString','praseInt','praseFloat'];
	  for(let i = 0; i < methodKeyWord.length; i++){
	    let regMethodKeyWord = '('+ methodKeyWord[i] + ')';
	    showCode = showCode.replace(new RegExp(regMethodKeyWord,'g'),"<span style='color : " + colors.methodkeyWord + "'>$1</span>");
	    // console.log('------',regMethodKeyWord,methodKeyWord[i]);
	  }
	  
      //变量名
      // let varReg = '( .+)(:)({|\[|<span style=)';
	  let varReg = /([a-zA-Z]+):/g
	  // console.log(showCode.match(varReg,'g'));
      showCode = showCode.replace(varReg,"<span style='color : " + colors.varWord + "'>$1</span>:");
	  //greyWords
	  showCode = showCode.replace(/(\/\/.*)|(\/\*.*([\r\n].*)*\*\/)/g,"<span style='color :"+ colors.note +"'>$1$2</span>")

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
	.code-height-light{
        background-color: #111827;
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
		    .code-copy{
		      cursor: pointer;
		      color: white;
			  text-align: right;
		      padding: 0.2rem 0.5rem;
			  
		    }
		  .content-body{
		    max-height: 400px;
		    overflow: scroll;
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
		    }
		  }
		}
	}
</style>

