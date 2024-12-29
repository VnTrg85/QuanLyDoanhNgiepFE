<template>
  <div class="task-view">
    <SubSidebar :userId="userId" @task-selected="taskId = $event" />
    <div class="task-list-container">
      <div v-if="taskId">
        <TaskList :taskId="taskId" />
      </div>
      <div v-else class="empty-state">
        <p>Please select a task to view its details.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubSidebar from "../components/SubSideBar_Task.vue";
import TaskList from "../components/TaskList.vue";

export default {
  components: { SubSidebar, TaskList },
  data() {
    return {
      userId: localStorage.getItem('auth')?.split(',')[0] ? localStorage.getItem('auth').split(',')[0] : 1,
      taskId: null,
    };
  },
};
</script>

<style>

.task-view {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif
}
.sub-sidebar {
  width: 300px;
  border-right: 1px solid #ddd;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
.task-list-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #777;
}
</style>
