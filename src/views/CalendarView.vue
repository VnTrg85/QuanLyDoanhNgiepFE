<template>
  <div class="chat-view-container">
    <CalendarSidebar v-model:selected-date="selectedDate"> </CalendarSidebar>
    <vue-cal
      ref="vuecal"
      class="vuecal--blue-theme"
      :events="calendars"
      :disable-views="['years', 'year']"
      :split-days="splitDays"
      :selected-date="selectedDate"
      small
      events-on-month-view="short"
      drag-to-create-threshold="0"
      @event-drag-create="dragCreateCal"
      :editable-events="{
        title: false,
        drag: false,
        resize: true,
        create: true,
      }"
    >
      <template #event="{ event }">
        <div
          @click="isOpenDetail = event"
          :class="[activeCal(event) ? 'active-cal' : '', 'calendar-item']"
        >
          <h5 class="calendar-title">{{ event.title }}</h5>
          <span class="calendar-time"
            >{{ formatTime('hour', event.start) }}:{{
              formatTime('minute', event.start)
            }}-{{ formatTime('hour', event.end) }}:{{
              formatTime('minute', event.end)
            }}</span
          >
        </div>
      </template>
    </vue-cal>

    <CreateCalendar
      @cancle="handleCancle"
      @save="handleSaveCal"
      v-if="openCreate"
      :cal-drag="calDragCreate"
    ></CreateCalendar>
    <DetailCalendar
      v-if="isOpenDetail"
      @close="isOpenDetail = ''"
      :event="isOpenDetail"
      @delete="handleDelete"
      @update="handleUpdate"
    ></DetailCalendar>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, provide, watch } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import CalendarSidebar from '../components/CalendarSidebar.vue'
import DetailCalendar from '@/components/DetailCalendar.vue'
import { formatTime, validateTime, compareToNow } from '@/Ulties/TimeFormat'
import CreateCalendar from '../components/CreateCalendar.vue'
import axios from 'axios'
const selectedDate = ref(new Date())
const isOpenDetail = ref('')
const calendars = ref([])
const splitDays = ref([])

const getAllCalendars = async () => {
  try {
    const data = await axios.get('http://localhost:8080/calendar/getAll')
    const tempData = data.data
    tempData.forEach(cal => {
      cal.start = new Date(cal.start)
      cal.end = new Date(cal.end)
    })
    calendars.value = tempData
  } catch (error) {
    console.log(error)
  }
}
onBeforeMount(() => {
  getAllCalendars()
})
const vuecal = ref(null)
const activeCal = e => {
  return validateTime(e.start, e.end)
}

watch(calendars, () => {
  console.log(calendars.value)
})
const handleSaveCal = cal => {
  const id = calendars.value.findIndex(item => calDragCreate._eid == cal.id)
  if (id) {
    calendars.value.splice(id, 1)
    openCreate.value = false
    calDragCreate.value = null
    openCreate.value = false
    calendars.value.push(cal)
  }
}
const handleCancle = idCal => {
  const id = calendars.value.findIndex(item => item._eid == idCal)
  calendars.value.splice(id, 1)
  openCreate.value = false
}

const openCreate = ref(false)
const calDragCreate = ref('')

const dragCreateCal = e => {
  openCreate.value = true
  calDragCreate.value = e
  calendars.value.push(e)
}

const handleDelete = id => {
  calendars.value.splice(
    calendars.value.findIndex(item => item.id == id),
    1,
  )
}
const handleUpdate = calTemp => {
  const id = calendars.value.findIndex(item => item.id == calTemp.id)
  if (id != null) {
    calendars.value.splice(id, 1)
    calendars.value.push(calTemp)
  }
}
</script>

<style scoped lang="scss">
.chat-view-container {
  width: 100%;
  display: flex;
}

.calendar-item.active-cal {
  color: #0f5648;
  background-color: #a0e1d0;
  border: 1px solid #ccc;
}
.calendar-item {
  color: #81d58b;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  .calendar-title {
    font-weight: 600;
    font-size: 16px;

    margin: 0 0 5px;
  }
  .calendar-time {
    font-size: 0.8em;
    color: #892525;
    font-weight: 600;
  }
}

::v-deep .vuecal--month-view .vuecal__cell {
  height: 80px;
}

::v-deep .vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

::v-deep .vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
::v-deep .vuecal--month-view .vuecal__no-event {
  display: none;
}
</style>
