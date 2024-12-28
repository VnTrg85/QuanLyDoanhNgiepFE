<template>
  <div class="container">
    <div class="container-top">
      <Header></Header>
    </div>
    <div class="container-bottom">
      <div class="container-bottom-left">
        <Sidebar></Sidebar>
      </div>
      <div class="container-bottom-right">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  .container-bottom {
    display: flex;
    .container-bottom-left {
      width: 75px;
    }
    .container-bottom-right {
      width: 100%;
    }
  }
}
</style>
