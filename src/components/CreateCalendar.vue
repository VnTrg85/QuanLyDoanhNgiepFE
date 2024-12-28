<template>
  <Teleport to="body">
    <div
      id="modal-mark"
      @click="handleCancle"
      class="modal-mark-ovverflow"
    ></div>
    <div class="calendar-create-container">
      <div class="calendar-create-header">
        <div>
          <FontAwesomeIcon :icon="faCalendar"></FontAwesomeIcon>
          <span>Create new calendars</span>
        </div>
        <div id="close-icon" @click="handleCancle" class="btn-close">
          <FontAwesomeIcon :icon="faXmark"></FontAwesomeIcon>
        </div>
      </div>
      <div class="calendar-create-body">
        <input
          class="calendar-title"
          type="text"
          v-model="data.title"
          placeholder="Add title to calendar"
        />
        <div class="calendar-create-item">
          <div class="calendar-time-label">
            <FontAwesomeIcon :icon="faClock"> </FontAwesomeIcon>
            <span>Time work</span>
          </div>
          <div class="calendar-time-picker">
            <div
              class="date-picker-label"
              @click="isShowDatePicker = !isShowDatePicker"
              disabled
            >
              {{ formatSelectedDate }}
              <div class="date-picker" v-if="isShowDatePicker">
                <DatePicker
                  :attributes="attributes"
                  @dayclick="onDayClick"
                ></DatePicker>
              </div>
            </div>
            <div class="separate-item" :style="{ height: '20px' }"></div>
            <div class="hour-picker">
              <div class="hour-start-label">
                <input
                  class="time-input"
                  type="time"
                  :value="formatStartTime"
                  @input="handleChangeStart"
                />
              </div>
              -
              <div class="hour-end-label">
                <input
                  class="time-input"
                  type="time"
                  :value="formatEndTime"
                  @input="handleChangeEnd"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="calendar-create-item">
          <div class="calendar-time-label">
            <FontAwesomeIcon :icon="faPenNib"></FontAwesomeIcon>
            <span>Work content</span>
          </div>
          <div class="input-editor">
            <QuillEditor v-model="data.content" :options="att"></QuillEditor>
          </div>
        </div>
        <div class="calendar-create-item">
          <div class="calendar-time-label">
            <FontAwesomeIcon :icon="faPenNib"></FontAwesomeIcon>
            <span>Report</span>
          </div>
          <div class="input-editor">
            <QuillEditor v-model="data.report" :options="att"></QuillEditor>
          </div>
        </div>
        <div class="calendar-actions">
          <Button title="Cancle" :active="false" @click="handleCancle"></Button>
          <Button
            id="close-btn"
            @click="handleSave"
            title="Save"
            :active="true"
            :class="[!validateData ? 'disable' : '']"
          ></Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject, onBeforeMount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Button from './Button.vue'
import {
  faCalendar,
  faLinesLeaning,
  faPenNib,
  faXmark,
  faClock,
} from '@fortawesome/free-solid-svg-icons'
import { Calendar, DatePicker } from 'v-calendar'
import { formatTime, validateTime } from '@/Ulties/TimeFormat'
import QuillEditor from './QuillEditor.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getUser } from '../services/Auth/index.js'
import axios from 'axios'

const att = {
  theme: 'snow',
  placeholder: 'Start typing...',
  modules: {
    toolbar: [['bold', 'italic', 'underline']],
  },
}

const userId = localStorage.getItem('auth').split(',')[0]

const emits = defineEmits(['close', 'cancle', 'save', 'update'])
const props = defineProps(['calDrag'])

const selectedDate = ref(new Date())
const isShowDatePicker = ref(false)
const formatSelectedDate = computed(() => {
  return formatTime('date', selectedDate.value)
})
const formatStartTime = computed(() => {
  return (
    formatTime('hour', new Date(data.value.start)) +
    ':' +
    formatTime('minute', new Date(data.value.start))
  )
})
const formatEndTime = computed(() => {
  return (
    formatTime('hour', new Date(data.value.end)) +
    ':' +
    formatTime('minute', new Date(data.value.end))
  )
})
const defaultData = {
  title: props.calDrag.title ? props.calDrag.title : '',
  start: props.calDrag.start,
  end: props.calDrag.end,
  content: props.calDrag.content ? props.calDrag.content : '',
  report: props.calDrag.report ? props.calDrag.report : '',
}
const data = ref(defaultData)
var quillEditor

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

const handleCancle = () => {
  emits('cancle', props.calDrag._eid)
}
const onDayClick = e => {
  selectedDate.value = e.date
}

const handleSave = async () => {
  try {
    if (props.calDrag.id != null) {
      const dataRes = await axios.put('http://localhost:8080/calendar/update', {
        ...data.value,
        user: { id: userId },
        id: props.calDrag.id,
      })
      let calTemp = dataRes.data
      calTemp.start = new Date(calTemp.start)
      calTemp.end = new Date(calTemp.end)
      emits('update', calTemp)
    } else {
      const dataRes = await axios.post('http://localhost:8080/calendar/add', {
        ...data.value,
        user: { id: userId },
      })
      let calTemp = dataRes.data
      calTemp.start = new Date(calTemp.start)
      calTemp.end = new Date(calTemp.end)

      emits('save', calTemp)
    }
  } catch (error) {
    console.log(error)
  }
}

const validateData = computed(() => {
  return (
    Boolean(data.value.title) &&
    Boolean(data.value.content) &&
    validateTime(data.value.start, data.value.end)
  )
})

const handleTextChange = e => {
  console.log(e.container.querySelector('.ql-blank').innerHTML)
}

const handleChangeStart = e => {
  data.value.start.setHours(e.target.value.split(':')[0])
  data.value.start.setMinutes(e.target.value.split(':')[1])
}
const handleChangeEnd = e => {
  data.value.end.setHours(e.target.value.split(':')[0])
  data.value.end.setMinutes(e.target.value.split(':')[1])
}
</script>

<style scoped lang="scss">
.modal-mark-ovverflow {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calendar-create-container {
  position: absolute;
  width: 600px;
  height: 80%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  z-index: 101;
  top: 10%;
  left: 30%;
}

.calendar-create-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 10px 10px;
  background: linear-gradient(var(--primary-color), rgb(161, 194, 174));
  font-size: 14px;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  span {
    margin-left: 10px;
  }
  .btn-close {
    cursor: pointer;
    padding: 5px;
  }
}
.calendar-create-body {
  height: 85%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 15px;
  .calendar-title {
    border: none;
    padding: 10px 0;
    outline: none;
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
  }
  .calendar-create-item {
    display: flex;
    flex-direction: column;
    &:first-child {
      display: flex;
      gap: 10px;
    }
    .calendar-time-label {
      margin: 20px 0 10px;
      display: flex;
      gap: 5px;
      span {
        font-family: 'Times New Roman', Times, serif;
        font-weight: 600;
      }
    }
    .input-editor {
      height: 100px;
      margin-bottom: 30px;
    }
    .calendar-time-picker {
      margin: 0px 0 0 20px;
      display: flex;
      align-items: center;
      gap: 50px;
      .date-picker-label {
        align-content: center;
        border-radius: 10px;
        padding: 5px;
        position: relative;
        pointer-events: none;
        cursor: pointer;
        .date-picker {
          position: absolute;
          z-index: 100;
          margin-top: 5px;
        }
      }
      .hour-picker {
        display: flex;
        gap: 10px;
      }
    }
  }
  .calendar-actions {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
}

.time-input {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
}

.disable {
  pointer-events: none;
  opacity: 0.5;
}
</style>
