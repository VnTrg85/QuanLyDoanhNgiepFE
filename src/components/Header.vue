<template>
  <div class="header">
    <div class="header-left">
      <FontAwesomeIcon :icon="faBars"></FontAwesomeIcon>
      <span>MaTeCom</span>
      <FontAwesomeIcon :icon="faUsers"></FontAwesomeIcon>
    </div>
    <div class="header-right">
      <FontAwesomeIcon :icon="faBell"></FontAwesomeIcon>
      <img
        src="https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg"
      />
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faUsers, faBell } from '@fortawesome/free-solid-svg-icons'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 20px;
  font-size: 20px;
  background: var(--secondary-color);
  color: white;
  height: 50px;
  font-size: 16px;
  .header-left {
    display: flex;
    gap: 30px;
    align-items: center;
    span {
      font-weight: 700;
    }
  }
  .header-right {
    display: flex;
    gap: 30px;
    align-items: center;
    font-size: 20px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>
