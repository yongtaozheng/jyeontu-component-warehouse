<template>
  <div id="topMenu">
    <span id="username" class="username">JYeontu</span>
    <img class="avatar" src="../../assets/logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {}
  },
  methods: {},
  created () {

  },
  mounted () {
    const username = document.getElementById('username')
    username.innerHTML = username.textContent.replace(/\S/g, '<span>$&</span>')
    document.querySelectorAll('span').forEach((span, index) => {
      span.style.setProperty('--delay', `${index * 0.1}s`)
    })
  }
}
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  float: right;
  margin: 10px;
}

.username {
  float: right;
  line-height: 60px;
  margin-right: 20px;
  color: white;
}

#topMenu {
  background-color: #111827;
  min-width: 100vw;
  height: 60px;
}

@keyframes blink {
  0%, 100% {
    color: inherit;
  }
  50% {
    color: #B9E769;
  }
}

#topMenu #username span {
  display: inline-block;
  animation-name: blink;
  /*取出style中的--delay属性值*/
  /*animation-delay: var(--delay);*/
  animation-timing-function: ease-in-out;
  animation-duration: .4s;
}
</style>
