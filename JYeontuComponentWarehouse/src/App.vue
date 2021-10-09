<template>
  <div id="app">
    <top>
    </top>
    <div style="display: flex;width: 100vw">
      <el-drawer
          class="drawer-left-content"
          title="菜单"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
        <left class="drawer-left-content"></left>
      </el-drawer>
      <left class="left-content"></left>
      <i class="menuBtn el-icon-menu drawer-left-content" @click="drawer = true" type="primary"
         style="margin-left: 10px;">
      </i>
      <router-view class="router-viewContent" id="routerViewContent"></router-view>
    </div>
  </div>
</template>

<script>
import left from './components/menu/left'
import top from './components/menu/top'

export default {
  name: 'app',
  components: {
    top,
    left
  },
  data () {
    return {
      drawer: false,
      direction: 'ltr'
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    reSizeWidth () {
      let a = document.getElementById('leftMenu')
      let aWidth = a.offsetWidth
      let b = document.getElementById('topMenu')
      let bWidth = b.offsetWidth
      let c = document.getElementById('routerViewContent')
      c.style.width = bWidth - aWidth + 'px'
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.reSizeWidth()
    // }, 1000)
  }
}
</script>

<style lang="scss">
.router-viewContent{
  //height: calc(100vh - 60px);
  width: 100%;
}
.drawer-left-content{
  display: none;
}
.left-content{
  display: block;
}

@media screen and (max-width:1000px) {
  .drawer-left-content{
    display: block;
	font-size: x-small !important;
  }
  .left-content{
	display: none;
  }
  #app{
	  font-size: x-small !important;
  }
}
body {
  margin: 0 0;
}

.el-drawer {
  width: auto !important;
}

.el-drawer__header {
  padding: 10px 20px 0 !important;
  padding-bottom: 25px !important;
  margin-bottom: 0 !important;
  background-color: #374151;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  width: 100vw;
  min-height: 100vh;
}

.menuBtn {
  position: absolute;
  top: 1rem;
}
</style>
