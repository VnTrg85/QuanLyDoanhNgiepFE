<template>
  <div class="sidebar">
    <div
      v-for="(item, index) in sidebarItems"
      :key="index"
      class="sidebar-item active"
    >
      <FontAwesomeIcon :icon="item.icon"></FontAwesomeIcon>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCommentDots,
  faReplyAll,
  faListCheck,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'

const sidebarItems = [
  { name: 'Chats', icon: faCommentDots },
  { name: 'Threads', icon: faReplyAll },
  { name: 'Tasks', icon: faListCheck },
  { name: 'Calendars', icon: faCalendarDays },
]

const active = ref(false)
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  .sidebar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    height: 50px;
    gap: 5px;
    padding: 0 2px;
    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .active {
    color: var(--primary-color);
    border-left: 3px solid var(--primary-color);
  }
}
</style>
