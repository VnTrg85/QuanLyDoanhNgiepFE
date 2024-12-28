import { onBeforeMount, onMounted, provide, ref, watchEffect } from 'vue'
import axios from 'axios'
const getUser = async () => {
  try {
    const dataRes = await axios.get(
      `http://localhost:8080/user/get/${localStorage.getItem('auth').split(',')[0]}`,
    )
    return dataRes.data
  } catch (error) {
    console.log(error)
  }
}

export { getUser }
