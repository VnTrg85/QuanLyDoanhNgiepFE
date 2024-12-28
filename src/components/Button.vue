<template>
  <button :class="['btn', active ? 'active' : '']">{{ title }}</button>
</template>

<script setup>
const props = defineProps(['title', 'active'])
</script>

<style scoped lang="scss">
.btn {
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  width: 50%;
  height: 40px;
  font-weight: 600;
  background: white;
  border: none;
  font-size: 15px;
}
.active {
  background: var(--primary-color);
  color: white;
  border: 1px solid #ccc;
}
</style>
