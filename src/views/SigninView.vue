<template>
  <div class="auth-container">
    <div v-if="!isSignUp" class="signin-container">
      <h1>Sign in</h1>
      <div class="auth-item">
        <h4>Email</h4>
        <input
          id="email"
          @input="handleChangeText"
          type="text"
          v-model="data.email"
        />
        <p v-if="errEmail" class="error-title">{{ errEmail }}</p>
      </div>
      <div class="auth-item">
        <h4>Password</h4>
        <input
          id="pass"
          @input="handleChangeText"
          v-model="data.password"
          type="password"
        />
        <p v-if="errPass" class="error-title">{{ errPass }}</p>
      </div>
      <div class="auth-item cus-auth-item">
        <Button
          title="Sign in"
          @click="handleSignin"
          :active="true"
          :class="[validateData ? '' : 'disable']"
        ></Button>
      </div>
      <div class="auth-item cus-auth-item">
        <span>No have account?</span>
        <span
          @click="
            () => {
              isSignUp = true
              errEmail = ''
              errPass = ''
              errConfirmPass = ''
              errUsername = ''
            }
          "
          :style="{ 'text-decoration': 'underline', cursor: 'pointer' }"
          >Sign up</span
        >
      </div>
    </div>
    <div v-if="isSignUp" class="signin-container">
      <h1>Sign up</h1>
      <div class="auth-item">
        <h4>Name</h4>
        <input
          id="name"
          @input="handleChangeText"
          type="text"
          v-model="data.username"
        />
        <p v-if="errUsername" class="error-title">{{ errUsername }}</p>
      </div>
      <div class="auth-item">
        <h4>Email</h4>
        <input
          id="email"
          @input="handleChangeText"
          v-model="data.email"
          type="text"
        />
        <p v-if="errEmail" class="error-title">{{ errEmail }}</p>
      </div>
      <div class="auth-item">
        <h4>Password</h4>
        <input
          id="pass"
          @input="handleChangeText"
          v-model="data.password"
          type="password"
        />
        <p v-if="errPass" class="error-title">{{ errPass }}</p>
      </div>
      <div class="auth-item">
        <h4>Confirm Password</h4>
        <input
          @input="handleConfirmChange"
          v-model="data.confirmPassword"
          type="password"
        />
        <p v-if="errConfirmPass" class="error-title">{{ errConfirmPass }}</p>
      </div>
      <div class="auth-item cus-auth-item">
        <Button
          title="Sign up"
          :active="true"
          :class="[validateData && validateDataSame ? '' : 'disable']"
          @click="handleSignup"
        ></Button>
      </div>
      <div class="cus-auth-item auth-item">
        <span>Already have account?</span>
        <span
          @click="
            () => {
              isSignUp = false
              errEmail = ''
              errPass = ''
              errConfirmPass = ''
              errUsername = ''
            }
          "
          :style="{ 'text-decoration': 'underline', cursor: 'pointer' }"
          >Sign in</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isSignUp = ref(false)
const defaultData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  userRole: { id: '2' },
}
const data = ref(defaultData)
const errEmail = ref('')
const errPass = ref('')
const errConfirmPass = ref('')
const errUsername = ref('')

const isValid = ref(false)
const handleChangeText = e => {
  if (!Boolean(e.target.value)) {
    if (e.target.id == 'email') {
      errEmail.value = 'Email must not be empty'
    } else if (e.target.id == 'pass') {
      errPass.value = 'Password must not be empty'
    } else if (e.target.id == 'name') {
      errUsername.value = 'Name must not be empty'
    }
  } else {
    if (e.target.id == 'email') {
      errEmail.value = ''
    } else if (e.target.id == 'pass') {
      errPass.value = ''
    } else if (e.target.id == 'name') {
      errUsername.value = ''
    }
  }
}

const validateData = computed(() => {
  return Boolean(data.value.email) && Boolean(data.value.password)
})
const validateDataSame = computed(() => {
  return data.value.password == data.value.confirmPassword
})
const handleSignin = async () => {
  try {
    const dataRes = await axios.post('http://localhost:8080/auth/login', {
      email: data.value.email,
      password: data.value.password,
    })
    if (dataRes.data == 'Password is incorrect') {
      alert(dataRes.data)
    } else if (dataRes.data == 'Email not valid') {
      alert(dataRes.data)
    } else {
      localStorage.setItem('auth', dataRes.data)
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
const handleSignup = async () => {
  try {
    const dataRes = await axios.post(
      'http://localhost:8080/auth/register',
      data.value,
    )
    isSignUp.value = false
    data.value = defaultData
  } catch (error) {
    console.log(error)
  }
}

const handleConfirmChange = e => {
  if (!Boolean(e.target.value)) {
    errConfirmPass.value = 'Confirm password must not be empty'
  } else {
    if (data.value.password != data.value.confirmPassword) {
      errConfirmPass.value = 'Confirm password and password is not the same'
    } else {
      errConfirmPass.value = ''
    }
  }
}
</script>

<style scoped lang="scss">
.auth-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  .signin-container {
    border-radius: 10px;
    width: 35%;
    height: fit-content;
    border: 1px solid #ccc;
    padding: 0 20px;
    h1 {
      width: 100%;
      color: var(--primary-color);
      text-align: center;
    }
    .auth-item {
      width: 100%;
      margin-bottom: 20px;
      span {
        margin-right: 5px;
      }
      h4 {
        font-size: 18px;
        margin: 30px 0 10px;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 95%;
        height: 40px;
        outline: none;
        font-size: 15px;
        padding: 0 10px;
      }
    }
  }
  .cus-auth-item {
    text-align: center;
  }
}

.disable {
  pointer-events: none;
  opacity: 0.5;
}

.error-title {
  color: red;
  font-size: 15px;
  margin: 0;
}
</style>
