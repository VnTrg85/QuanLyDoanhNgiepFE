<template>
  <div class="chatview">
    <div class="chatview-groupchat">
      <h3 class="chatview-groupchat-title">Chats</h3>
      <div>
        <div class="group-chat-item active">
          <FontAwesomeIcon :icon="faUserGroup"></FontAwesomeIcon>
          Business Structure
        </div>
        <div class="group-chat-item">
          <FontAwesomeIcon :icon="faUserGroup"></FontAwesomeIcon>
          Finance and Accounting
        </div>
        <div class="group-chat-item">
          <FontAwesomeIcon :icon="faUserGroup"></FontAwesomeIcon>
          Marketing and Sales
        </div>
        <div class="group-chat-item">
          <FontAwesomeIcon :icon="faUserGroup"></FontAwesomeIcon>
          Human Resources
        </div>
        <div class="group-chat-item">
          <FontAwesomeIcon :icon="faUserGroup"></FontAwesomeIcon>
          Operations and Strategy
        </div>
      </div>
    </div>
    <div class="chatview-content-wrapper">
      <div class="chatview-content">
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
      </div>
      <div class="input-message">
        <QuillEditor v-model="messageNew" :options="att"> </QuillEditor>
        <Button title="Send" :active="true" class="btn-send">Send</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import Message from '../components/Message.vue'
import { ref, watch } from 'vue'
import QuillEditor from '../components/QuillEditor.vue'
import Button from '../components/Button.vue'

const data = [
  { id: 0, content: 'Hi this is the test' },
  { id: 1, content: 'Hi this is the test' },
  { id: 2, content: 'Hi this is the test' },
]

const messageNew = ref('')
const att = {
  theme: 'snow',
  placeholder: 'Start typing...',
  modules: {
    toolbar: [['bold', 'italic', 'underline']],
  },
}
</script>
<style scoped>
.chatview-content-wrapper {
  width: 100%;
  height: 550px;
  overflow: scroll;
}
.chatview {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.chatview-groupchat {
  width: 250px;
  background: #f5f5f5;
  height: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  border-radius: 10px;
}
.chatview-groupchat-title {
  padding: 0 0 10px;
  font-size: 20px;
  border-bottom: 1px solid black;
}
.group-chat-item {
  margin-bottom: 5px;
  padding: 5px;
  width: 95%;
  height: 40px;
  font-size: 16px;
  color: rgb(6, 21, 6);
  align-content: center;
  border-radius: 10px;
  cursor: pointer;
}
.group-chat-item:hover {
  background: #fff;
}

.chatview-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  overflow: scroll;
}
.active {
  color: var(--primary-color);
  background: #fff;
  font-weight: 600;
}

.input-message {
  position: fixed;
  width: 95%;
  height: 200px;
  top: 80%;
  z-index: 100;
  background: white;
}

.btn-send {
  outline: none;
  width: 100px;
  height: 40px;
  position: absolute;
  top: 0%;
  left: -8%;
}

.btn-send:hover {
  background: var(--primary-color);
  color: #fff;
}
.ql-container {
  height: 90px !important;
}
</style>
