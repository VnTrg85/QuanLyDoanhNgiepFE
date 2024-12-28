<template>
  <div class="message">
    <div class="message-left">
      <img
        class="avatar"
        src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
      />
    </div>
    <div class="message-right">
      <div class="message-right-header">
        <h5 class="user-name">Nguyen Van A</h5>
        <p class="message-time">12/2/2024</p>
      </div>
      <p>
        Hi this is Nguyen Van AHi this is Nguyen Van AHi this is Nguyen Van AHi
        this is Nguyen Van AHi this is Nguyen Van A
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['message'])
</script>
<style>
.message {
  display: flex;
  width: auto;
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  align-items: start;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
}

.avatar {
  width: 20px;
  height: 20px;
}

.user-name {
  margin: 0;
  font-size: 15px;
}
.message-time {
  margin: 0;
  font-size: 15px;
}
.message-right {
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.message-right-header {
  display: flex;
  gap: 10px;
}
</style>
