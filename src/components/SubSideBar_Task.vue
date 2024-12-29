<template>
  <div class="sub-sidebar">
    <h2 class="sidebar-header">Your Tasks</h2>
    <ul class="task-list">
      <li 
        v-for="task in tasks" 
        :key="task.id" 
        @click="selectTask(task.id)"
        :class="{ active: task.id === selectedTaskId }"
        class="task-item"
      >
        {{ task.name }}
      </li>
    </ul>
    <div class="add-task">
      <input 
        v-model="newTaskName" 
        placeholder="New Task Name" 
        class="task-input" 
        @keyup.enter="addTask" 
      />
      <button @click="addTask" class="add-task-button">+ Add Task</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      selectedTaskId: null,
      newTaskName: "",
    };
  },
  methods: {
    fetchTasks() {
      axios.get(`http://localhost:8080/tasks/user/${this.userId}`).then((response) => {
        this.tasks = response.data;
      });
    },
    selectTask(taskId) {
      this.selectedTaskId = taskId;
      this.$emit("task-selected", taskId);
    },
    addTask() {
      if (!this.newTaskName.trim()) return;

      axios
        .post("http://localhost:8080/tasks", {
          name: this.newTaskName,
          userId: this.userId,
        })
        .then(() => {
          this.newTaskName = "";
          this.fetchTasks();
        });
    },
  },
  props: {
    userId: { type: Number, required: true },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.sub-sidebar {
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: #f7f9fb;
  border-right: 1px solid #ddd;
}

.sidebar-header {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: none;
}

.task-item {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.task-item:hover {
  background-color: #e6f7ff;
}

.task-item.active {
  font-weight: bold;
  color: #007bff;
  background-color: #d0ebff;
}

.add-task {
  margin-top: 20px;
}

.task-input {
  width: 93%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.add-task-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}
</style>
