<template>
  <div class="task-card">
    <ul class="card-list">
      <li v-for="card in cards" :key="card.id" class="card-item">
        <div class="card-info">
          <span>{{ card.name }}</span>
        <div v-if="card.date_end != null" :key="card.id" style="margin-top:5px; font-size: 14px" >
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik05LjUgMTFIMi41QzEuOTQ3NzIgMTEgMS41IDEwLjU1MjMgMS41IDEwVjNDMS41IDIuNDQ3NzIgMS45NDc3MiAyIDIuNSAySDMuNVYxSDQuNVYySDcuNVYxSDguNVYySDkuNUMxMC4wNTIzIDIgMTAuNSAyLjQ0NzcyIDEwLjUgM1YxMEMxMC41IDEwLjU1MjMgMTAuMDUyMyAxMSA5LjUgMTFaTTIuNSA1VjEwSDkuNVY1SDIuNVpNMi41IDNWNEg5LjVWM0gyLjVaTTguNSA3SDMuNVY2SDguNVY3WiIgZmlsbD0iIzQ3NTQ2NyIvPgo8L3N2Zz4=" style="margin-right: 5px"/>
          <span>{{ card.date_end }}</span>
        </div>
        </div>
              <button class="delete-button" @click="deleteCard(card.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cards: [],
      newCardName: "",
    };
  },
  methods: {
    fetchCards() {
      axios.get(`http://localhost:8080/cards/list-card/${this.listId}`).then((response) => {
        this.cards = response.data;
      });
    },
    addCard() {
      if (!this.newCardName.trim()) return;
      axios
        .post(`http://localhost:8080/cards/list-card/${this.listId}`, { name: this.newCardName })
        .then(() => {
          this.newCardName = "";
          this.fetchCards();
        });
    },
    deleteCard(cardId) {
      axios.delete(`http://localhost:8080/cards/${cardId}`).then(() => this.fetchCards());
    },
  },
  props: {
    listId: { type: Number, required: true },
    listName: { type: String, required: true },
  },
  watch: {
    listId: "fetchCards",
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<style scoped>
.task-card {
  margin-top: -20px;
  padding: 15px;
  border-radius: 8px;
}

.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.card-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: white;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.1);
}

.card-info{
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.delete-button {
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.delete-button:hover {
  background-color: #d62839;
}
</style>
