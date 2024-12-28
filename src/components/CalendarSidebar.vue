<template>
  <div class="calendar-sidebar">
    <DatePicker :attributes="attributes" @dayclick="onDayClick"></DatePicker>
    <div class="btn-today" @click="selectedDate = new Date()">Today</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import Button from './Button.vue'
const selectedDate = defineModel('selectedDate')
const attributes = ref([
  {
    key: 'selected',
    dates: selectedDate.value,
    highlight: {
      color: 'gray',
      fillMode: 'outline',
    },
  },
])
const onDayClick = e => {
  selectedDate.value = e.date
}
</script>

<style scoped lang="scss">
.calendar-sidebar {
  width: fit-content;
  height: auto;
  border: 1px solid #ccc;
}

.btn-today {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  align-content: center;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 600;
}
</style>
