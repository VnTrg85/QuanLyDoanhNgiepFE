<template>
  <Teleport to="body">
    <div class="modal-delete" v-if="isDelete">
      <h5>Are you sure want to delete?</h5>
      <div class="action">
        <Button
          :active="false"
          title="Cancle"
          @click="isDelete = false"
        ></Button>
        <Button :active="true" title="Delete" @click="handleDelete"></Button>
      </div>
    </div>
    <div class="modal-mark" @click="handleClose"></div>
    <div v-if="!isDelete && !isEdit" class="detail-cal">
      <div class="detail-header">
        <p class="cal-title">{{ cal.title }}</p>
        <div>
          <div @click="isEdit = true">
            <FontAwesomeIcon :icon="faPen"></FontAwesomeIcon>
          </div>
          <div @click="isDelete = true">
            <FontAwesomeIcon :icon="faTrashCan"></FontAwesomeIcon>
          </div>
          <span class="divide-ele"></span>
          <div @click="emits('close')">
            <FontAwesomeIcon :icon="faX"></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-body-item">
          <FontAwesomeIcon :icon="faCalendarDays"></FontAwesomeIcon>
          <span>Working hours</span>
          <div class="working-hour">
            <p>{{ formatTime('date', cal.start) }}</p>
            <p class=""></p>
            <p>
              {{ formatTime('hour', cal.start) }}:{{
                formatTime('minute', cal.start)
              }}
              - {{ formatTime('hour', cal.end) }}:{{
                formatTime('minute', cal.end)
              }}
            </p>
          </div>
        </div>
        <div class="detail-body-item">
          <FontAwesomeIcon :icon="faUser"></FontAwesomeIcon>
          <span>Owner</span>
          <p>Nguyen Van Truong</p>
        </div>
        <div class="detail-body-item">
          <FontAwesomeIcon :icon="faTextHeight"></FontAwesomeIcon>
          <span>Work Content</span>
          <div v-html="cal.content" class="editor-cal"></div>
        </div>
        <div class="detail-body-item">
          <FontAwesomeIcon :icon="faTextHeight"></FontAwesomeIcon>
          <span>Report</span>
          <div v-html="cal.report" class="editor-cal"></div>
        </div>
      </div>
    </div>
    <CreateCalendar
      @cancle="handleCloseSecond"
      @update="handleUpdate"
      v-if="isEdit"
      :calDrag="cal"
    ></CreateCalendar>
  </Teleport>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CreateCalendar from './CreateCalendar.vue'
import { formatTime } from '../Ulties/TimeFormat.js'
import Button from './Button.vue'
import {
  faCalendarDays,
  faPen,
  faTextHeight,
  faTrashCan,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import { ref } from 'vue'
const options = {
  theme: 'buble',
  modules: {
    toolbar: null,
  },
}

const isDelete = ref(false)
const isEdit = ref(false)
const emits = defineEmits(['close', 'delete', 'update'])
const props = defineProps(['event'])
const cal = ref(props.event)

const handleDelete = async () => {
  try {
    const data = await axios.delete(
      `http://localhost:8080/calendar/delete/${props.event.id}`,
    )
    emits('delete', props.event.id)
    emits('close')
  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  if (isDelete.value) {
    isDelete.value = false
  } else emits('close')
}
const handleCloseSecond = () => {
  isEdit.value = false
}
const handleUpdate = calTemp => {
  cal.value = null
  cal.value = calTemp
  isEdit.value = false
  emits('update', calTemp)
}
</script>

<style scoped lang="scss">
.modal-delete {
  padding: 20px;
  width: 300px;
  height: 150px;
  position: absolute;
  top: 30%;
  left: 42%;
  z-index: 1000;
  background: #fff;
  border-radius: 10px;
  h5 {
    font-size: 18px;
    text-align: center;
  }
}
.modal-mark {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-cal {
  background: white;
  z-index: 100;
  position: absolute;
  top: 15%;
  left: 30%;
  width: 50%;
  border-radius: 10px;
  overflow: hidden;
  .detail-header {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background: #a2dfb8;
    padding: 10px;
    .cal-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    div {
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      gap: 10px;
      cursor: pointer;
    }
  }
  .detail-body {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 0 10px;
    height: 80%;
    .detail-body-item {
      margin-top: 20px;
      span {
        margin-left: 5px;
        margin-bottom: 5px;
        font-weight: 600;
      }
      .working-hour {
        display: flex;
        align-content: center;
        gap: 20px;
      }
    }
    .editor-cal {
      overflow: scroll;
      height: 100px;
      margin-bottom: 50px;
      margin-top: 10px;
      padding: 5px;
      border: 1px solid #ccc;
    }
  }

  .divide-ele {
    border-right: 2px solid black;
  }
}
</style>
