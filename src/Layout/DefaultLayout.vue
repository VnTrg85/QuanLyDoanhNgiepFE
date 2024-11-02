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
}
</style>
