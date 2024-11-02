<template>
  <div class="sub-sidebar">
    <h3>{{ props.name }}</h3>
    <div class="sub-sidebar-container">
      <p class="sub-sidebar_item" v-for="item in props.data" :key="item.id">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps([name, data])
</script>

<style scoped lang="scss"></style>
