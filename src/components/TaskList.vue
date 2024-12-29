<template>
  <div class="task-list">
    <div 
      v-for="listCard in listCards" 
      :key="listCard.id" 
      class="list-card"
      @click="togglePoup(listCard)"
    >
      <div class="list-header">
        <ul>
          <div v-if="!listCard.isEditing">
            {{ listCard.name }}
          </div>
          <div v-else>
            <input 
              v-model="listCard.name" 
              @blur="updateListCard(listCard)" 
              placeholder="List Name" 
            />
          </div>
        </ul>
        <div class="menu">
          <button @click="toggleMenu(listCard.id)" class="editbutton">...</button>
          <div v-if="isMenuOpen[listCard.id]" class="menu-options">
            <button @click="deleteListCard(listCard.id)">Delete</button>
            <button @click="editListCard(listCard)">Edit</button>
          </div>
        </div>
      </div>
      <div class="task-cards-container">
        <task-card  
        :list-id="listCard.id" 
        :list-name="listCard.name"
        />
      </div>
      <div class="add-card">
        <input 
          v-model="newCardName[listCard.id]" 
          placeholder="Add a card" 
          @keyup.enter="addCard(listCard.id)" 
        />
        <button @click="addCard(listCard.id)">Add</button>
      </div>
    </div>
    <div class="add-list">
      <input 
        v-model="newListCardName" 
        placeholder="Add a list" 
        @keyup.enter="addListCard" 
      />
      <button @click="addListCard">Add List</button>
    </div>
    <CardDetail :cardId="isOpenPopup" v-if="isOpenPopup"></CardDetail>
  </div>
</template>

<script>
import axios from "axios";
import TaskCard from "./TaskCard.vue";
import CardDetail from "./CardDetail.vue"
import { ref } from 'vue';
export default {
  components: {
    TaskCard,
    CardDetail
  },
  setup() {
    const isOpenPopup = ref(0);
    const togglePoup = (id) => {
      isOpenPopup.value = id;
    }
    return {isOpenPopup,togglePoup}
  },
  data() {
    return {
      
      listCards: [],
      newListCardName: "",
      newCardName: {},
      isMenuOpen: {},
    };
  },
  props: {
    taskId: { type: Number, required: true },
  },
  methods: {
    fetchListCards() {
      axios.get(`http://localhost:8080/list-cards/task/${this.taskId}`).then((response) => {
        this.listCards = response.data;
        this.listCards.forEach((listCard) => {
          if (this.newCardName[listCard.id] === undefined) {
            this.newCardName[listCard.id] = "";
          }
          if (this.isMenuOpen[listCard.id] === undefined) {
            this.isMenuOpen[listCard.id] = false;
          }
          if (listCard.isEditing === undefined) {
            listCard.isEditing = false;
          }
        });
      });
    },
    addListCard() {
      if (!this.newListCardName.trim()) return;

      axios
        .post(`http://localhost:8080/list-cards/task/${this.taskId}`, {
          name: this.newListCardName,
          taskId: this.taskId,
        })
        .then(() => {
          this.newListCardName = "";
          this.fetchListCards();
        });
    },
    updateListCard(listCard) {
      axios.put(`http://localhost:8080/list-cards/${listCard.id}`, { name: listCard.name }).then(() => {
        this.fetchListCards();
      });
    },
    deleteListCard(listCardId) {
      axios.delete(`http://localhost:8080/list-cards/${listCardId}`).then(() => {
        listCard.isEditing = false;
        this.fetchListCards();
      });
    },
    addCard(listId) {
      const cardName = this.newCardName[listId];
      if (!cardName || !cardName.trim()) return;
      axios
        .post(`http://localhost:8080/cards/list-card/${listId}`, { name: cardName })
        .then(() => {
          this.newCardName[listId] = "";
          this.fetchListCards();
        });
    },
    toggleMenu(listCardId) {
      this.isMenuOpen = {
        ...this.isMenuOpen,
        [listCardId]: !this.isMenuOpen[listCardId],
      };
    },
    editListCard(listCard) {
      listCard.isEditing = true;
    },
  },
  mounted() {
    this.fetchListCards();
  },
};
</script>

<style>
.task-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px;
}
.list-card {
  width: 320px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  background: var(--neutral-3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: 15px;
  margin-top: -15px;
  margin-left: -15px;
  margin-right: -15px;
  background-color: rgb(152, 228, 228);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.list-header input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.menu {
  position: relative;

}
.editbutton {
  background: none; 
  box-sizing: border-box; 
  border: none; 
  font-size: 16px;
  margin-right: 2px;
}
.editbutton:hover{
  background-color: #f1f1f1;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}
.menu-options {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 10;
}
.menu-options button {
  display: block;
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
.menu-options button:hover {
  background-color: #f1f1f1;
}
.add-card input {
  width: 93%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.add-card button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-list input {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 10px;
  margin-bottom: 10px;
}
.add-list button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
  background: none;
}

.task-card {
  flex: 1 1 calc(100% / 3 - 10px);
  box-sizing: border-box;
  background: none;
}
</style>
