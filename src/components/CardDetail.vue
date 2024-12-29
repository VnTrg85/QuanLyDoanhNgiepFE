<template>
  <Teleport to="body">
    <div class="modal-mark">
    <div class="card-detail">
    <div v-if="card">
      <div class="card-info">
        <div class="card-header">
          <h3 style="color: white"><span style="margin-left: 5px">{{ card.name }}</span></h3>
          <button class="close-btn">✖</button>
        </div>
        <div class="section">
          <div>
            <label class="section-label"><strong>Start Date</strong></label>
            <input type="date" class="date-input" v-model="card.date_start" @change="updateDate('date_start', card.date_start)" />
          </div>
          <img style="margin-top: 23px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktYXJyb3ctcmlnaHQiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMSA4YS41LjUgMCAwIDEgLjUtLjVoMTEuNzkzbC0zLjE0Ny0zLjE0NmEuNS41IDAgMCAxIC43MDgtLjcwOGw0IDRhLjUuNSAwIDAgMSAwIC43MDhsLTQgNGEuNS41IDAgMCAxLS43MDgtLjcwOEwxMy4yOTMgOC41SDEuNUEuNS41IDAgMCAxIDEgOCIvPgo8L3N2Zz4="/>
          <div>
            <label class="section-label"><strong>End Date</strong></label>
            <input type="date" class="date-input" v-model="card.date_end" @change="updateDate('date_end', card.date_end)" />
          </div>
        </div>
        <div>
          <div v-if="isEditingDescription">
            <div class="section">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik0xMCAxMi42NjYzSDJWMTEuMzMzSDEwVjEyLjY2NjNaTTE0IDkuOTk5NjdIMlY4LjY2NjM0SDE0VjkuOTk5NjdaTTEwIDcuMzMzMDFIMlY1Ljk5OTY3SDEwVjcuMzMzMDFaTTE0IDQuNjY2MzRIMlYzLjMzMzAxSDE0VjQuNjY2MzRaIiBmaWxsPSIjMzQ0MDU0Ii8+Cjwvc3ZnPg==">
              <p><strong>Description</strong></p>
            </div>
            <textarea v-model="card.description"
              @blur="saveDescription"
              placeholder="Edit description"
              class="description-textarea"
            ></textarea>
            <button @click="saveDescription" class="save-btn">Save</button>
            <button @click="cancelEditDescription" class="cancel-btn">Cancel</button>
          </div>
          <div v-else>
            <div class="section">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik0xMCAxMi42NjYzSDJWMTEuMzMzSDEwVjEyLjY2NjNaTTE0IDkuOTk5NjdIMlY4LjY2NjM0SDE0VjkuOTk5NjdaTTEwIDcuMzMzMDFIMlY1Ljk5OTY3SDEwVjcuMzMzMDFaTTE0IDQuNjY2MzRIMlYzLjMzMzAxSDE0VjQuNjY2MzRaIiBmaWxsPSIjMzQ0MDU0Ii8+Cjwvc3ZnPg==">
              <p><strong>Description</strong></p>
              <button @click="editDescription" class="edit-btn">Edit</button>
            </div>
            <p>{{ card.description }}</p>
          </div>
        </div>
      <div>
        <div class="section">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik0xMy41NzM0IDguNjY2TDEwLjAwMDYgMTIuMjMzOEw4LjkwNzUxIDExLjE0MDdMOS4xNDMyOSAxMC45MDQ2TDkuNjQ2ODIgMTEuNDA4OUwxMC4wMDAxIDExLjc2MjhMMTAuMzUzOSAxMS40MDk1TDEzLjMzODMgOC40Mjk5TDEzLjU3MzQgOC42NjZaTTYuODMzOTggMTAuODMzN0gxLjgzMzk4VjEwLjUwMDNINi44MzM5OFYxMC44MzM3Wk05LjUwMDY1IDguMTY2OTlIMS44MzM5OFY3LjgzMzY2SDkuNTAwNjVWOC4xNjY5OVpNOS41MDA2NSA1LjUwMDMzSDEuODMzOThWNS4xNjY5OUg5LjUwMDY1VjUuNTAwMzNaIiBmaWxsPSIjMkUzQTU5IiBzdHJva2U9IiMzNDQwNTQiLz4KPC9zdmc+"/>
          <p><strong>Checklist</strong></p>
          <button v-if="!addingChecklist" @click="startAddingChecklist" style="height: 20px; margin-top: 16px">Add Checklist</button>
          <div v-else class="add-checklist-form">
            <input
              type="text"
              v-model="newChecklistName"
              placeholder="Enter checklist name"
            />
            <button @click="confirmAddChecklist">Add</button>
            <button @click="cancelAddChecklist">Cancel</button>
          </div>
        </div>
          <div v-for="checklist in checklists" :key="checklist.id" class="checklist">
          <div class="checklist-header">
            <div>
              <img style="height: 15px; width: 15px"
                :src="checklist.status 
                ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iYmxhY2siIGNsYXNzPSJiaSBiaS1jaGVjazItc3F1YXJlIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik0zIDE0LjVBMS41IDEuNSAwIDAgMSAxLjUgMTNWM0ExLjUgMS41IDAgMCAxIDMgMS41aDhhLjUuNSAwIDAgMSAwIDFIM2EuNS41IDAgMCAwLS41LjV2MTBhLjUuNSAwIDAgMCAuNS41aDEwYS41LjUgMCAwIDAgLjUtLjVWOGEuNS41IDAgMCAxIDEgMHY1YTEuNSAxLjUgMCAwIDEtMS41IDEuNXoiLz4KICA8cGF0aCBkPSJtOC4zNTQgMTAuMzU0IDctN2EuNS41IDAgMCAwLS43MDgtLjcwOEw4IDkuMjkzIDUuMzU0IDYuNjQ2YS41LjUgMCAxIDAtLjcwOC43MDhsMyAzYS41LjUgMCAwIDAgLjcwOCAwIi8+Cjwvc3ZnPg==' 
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQizMhv2nVNGe1dHXEPmFCpoH4l9pfzZvIZnVmu0IqxdWqemYmD7UnZEaBqKny-SbFDU7o&usqp=CAU'"
                alt="Checklist Status"
              />
              <span 
                v-if="!checklist.isEditing" 
                @click="enableEditing(checklist)"
              >
                {{ checklist.name }}
              </span>
              <input
                v-else
                type="text"
                v-model="checklist.name"
                @blur="updateChecklist(checklist)"
                placeholder="Checklist Name"
                @keyup.enter="updateChecklist(checklist)"
              />
            </div>
            <button @click="deleteChecklist(checklist.id)">Delete</button>
          </div>
          <div class="checklist-items">
            <div
              v-for="item in checklist.items"
              :key="item.id"
              class="checklist-item"
            >
              <input
                type="checkbox"
                v-model="item.status"
                @change="updateChecklistItemStatusAndReloadChecklist(item)"
              />
              <input style="border: none"
                type="text"
                v-model="item.name"
                @blur="updateChecklistItem(item)"
                placeholder="Item Name"
              />
              <button style="margin-left: 439px" @click="deleteChecklistItem(item.id)">Delete</button>
            </div>
            <button style="width: 30%" @click="addChecklistItem(checklist.id)">Add Item</button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
  </div>
  </Teleport>
</template>

<script>
import axios from "axios";

export default {
  props: {
    cardId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      card: null,
      checklists: [],
      isEditingDescription: false,
      isEditing: false,
      addingChecklist: false,
    };
  },
  methods: {
    async fetchCardDetail() {
      try {
        const response = await axios.get(`http://localhost:8080/cards/cardsdetail/${this.cardId.id}`);
        this.card = response.data;
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    },
    async fetchChecklists() {
      try {
        const response = await axios.get(`http://localhost:8080/checklists/card/${this.cardId.id}`);
        this.checklists = response.data;
        this.checklists.forEach(checklist => {
      this.fetchChecklistItems(checklist.id);
    });
      } catch (error) {
        console.error("Error fetching checklists:", error);
      }
    },

    async fetchChecklistItems(checklistId) {
  try {
    const response = await axios.get(`http://localhost:8080/checklists/${checklistId}/items`);
    const checklist = this.checklists.find((cl) => cl.id === checklistId);
    if (checklist) {
      checklist.items = response.data;
    }
  } catch (error) {
    console.error("Error fetching checklist items:", error);
  }
},

    async addChecklist() {
      try {
        const response = await axios.post(`http://localhost:8080/checklists/${this.cardId.id}`, {
          name: "New Checklist",
          status: false,
        });
        this.checklists.push(response.data);
      } catch (error) {
        console.error("Error adding checklist:", error);
      }
    },
    async updateChecklist(checklist) {
      try {
        await axios.put(`http://localhost:8080/checklists/${checklist.id}`, checklist);
      } catch (error) {
        console.error("Error updating checklist:", error);
      }
    },
    async deleteChecklist(checklistId) {
      try {
        await axios.delete(`http://localhost:8080/checklists/${checklistId}`);
        this.checklists = this.checklists.filter(
          (checklist) => checklist.id !== checklistId
        );
      } catch (error) {
        console.error("Error deleting checklist:", error);
      }
    },
    async addChecklistItem(checklistId) {
      try {
        const response = await axios.post(
          `http://localhost:8080/checklists/${checklistId}/items`,
          {
            name: "New Item",
            status: false,
          }
        );
        const checklist = this.checklists.find(
          (checklist) => checklist.id === checklistId
        );
        checklist.items.push(response.data);
      } catch (error) {
        console.error("Error adding checklist item:", error);
      }
    },
    async updateChecklistItemStatusAndReloadChecklist(item) {
      try {
        await axios.put(`http://localhost:8080/checklists/items/${item.id}`, item);
        await this.fetchChecklists();
      } catch (error) {
        console.error("Error updating checklist item and reloading checklists:", error);
      }
    },
    async updateChecklistItem(item) {
      try {
        await axios.put(`http://localhost:8080/checklists/items/${item.id}`, item);
      } catch (error) {
        console.error("Error updating checklist item:", error);
      }
    },
    async deleteChecklistItem(itemId) {
      try {
        await axios.delete(`http://localhost:8080/checklists/items/${itemId}`);
        this.checklists.forEach((checklist) => {
          checklist.items = checklist.items.filter((item) => item.id !== itemId);
        });
      } catch (error) {
        console.error("Error deleting checklist item:", error);
      }
    },
    
    async updateDate(field, value) {
      try {
        await axios.put(`http://localhost:8080/cards/carddetail/${this.card.id}`, {
        [field]: value,
        });
        console.log(`${field} updated successfully`);
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
      }
    },

    enableEditing(checklist) {
    this.checklists.forEach((cl) => {
      if (cl.id === checklist.id) {
        cl.isEditing = true;
      } else {
        cl.isEditing = false;
      }
      });
    },
    async updateChecklist(checklist) {
    checklist.isEditing = false;
    try {
      await axios.put(`http://localhost:8080/checklists/${checklist.id}`, checklist);
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  },

    startAddingChecklist() {
      this.addingChecklist = true;
      this.newChecklistName = "";
    },
    cancelAddChecklist() {
      this.addingChecklist = false;
    },
    confirmAddChecklist() {
      if (this.newChecklistName.trim()) {
        const newChecklist = {
          id: Date.now(),
          name: this.newChecklistName,
          items: [],
        };
        this.checklists.push(newChecklist);
      }
      this.addingChecklist = false;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    editDescription() {
      this.isEditingDescription = true;
    },
    cancelEditDescription() {
      this.isEditingDescription = false;
    },
    async saveDescription() {
    try {
      await axios.put(`http://localhost:8080/cards/carddetail/${this.card.id}`, {
        description: this.card.description,
      });
      this.isEditingDescription = false;
    } catch (error) {
      console.error("Error saving description:", error);
    }
  },
  },
  async mounted() {
    await this.fetchCardDetail();
    await this.fetchChecklists();
  },
};
</script>

<style scoped>

.modal-mark {
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
.card-detail {
  padding: 20px;
  z-index: 100;
  background: #fff;
  width: 700px;
  border-radius: 10px;
  align-items: center;
}

.add-checklist-form {
  margin-top: 16px;
  margin-left: 5px;
  gap: 5px;
}

.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: #d5b5b5;
  margin-top: -20px;
  margin-right: -20px;
  margin-left: -20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.section {
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.section-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.checklists {
  margin-top: 20px;
}

.checklist {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

.checklist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checklist-items {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
}

.checklist-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding-bottom: 5px;
}
.description-textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
}

.edit-btn{
  background: #eaecf0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 550px;
  margin-top: 17px;
  height: 30px;
  width: 90px;
  border: none;
  border-radius: 5px;
}
.save-btn,
.cancel-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.cancel-btn {
  background-color: #dc3545;
}

.edit-btn:hover,
.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.8;
}
</style>
