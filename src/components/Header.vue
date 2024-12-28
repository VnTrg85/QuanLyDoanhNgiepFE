<template>
  <div class="header">
    <div class="header-left">
      <FontAwesomeIcon :icon="faBars"></FontAwesomeIcon>
      <span>MaTeCom</span>
      <FontAwesomeIcon :icon="faUsers"></FontAwesomeIcon>
    </div>
    <div class="header-right">
      <FontAwesomeIcon :icon="faBell"></FontAwesomeIcon>
      <div class="profile" @click="handlePopup">
        <img
          src="https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg"
        />
        <div v-if="isOpenPopup" class="profile-popup">
          <h4>Profile</h4>
          <h4 @click="handleSignout">Sign out</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faUsers, faBell } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isOpenPopup = ref(false)
const handlePopup = () => {
  isOpenPopup.value = !isOpenPopup.value
}

const handleSignout = () => {
  localStorage.removeItem('auth')
  router.push('/auth')
}
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
    .profile {
      position: relative;
      cursor: pointer;

      .profile-popup {
        background: white;
        // border: 1px solid #ccc;
        z-index: 100;
        color: black;
        position: absolute;
        width: 150px;
        top: 35px;
        right: 0px;
        border-radius: 5px;
        h4 {
          margin: 0px;
          font-size: 15px;
          border-bottom: 1px solid #ccc;
          cursor: pointer;
          padding: 10px;
          font-weight: 500;
        }
        h4:hover {
          background: var(--primary-color);
        }
      }
    }
  }
}
</style>
