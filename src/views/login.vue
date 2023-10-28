<template>
    <div class="login">
      <h3>Sign In</h3>
      <input type="text" placeholder="Email" v-model="email"><br>
      <input type="password" placeholder="Password" v-model="password"><br>
      <button @click="login">Connection</button>
      <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
  </template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/main.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'LoginForm',
  setup () {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        alert('Well done! You are now connected')
        router.replace('/home')
      } catch (err) {
        alert('Oops. ' + err.message)
      }
    }

    return {
      email,
      password,
      login
    }
  }
}
</script>

  <style scoped>
    .login {
      margin-top: 40px;
    }
    input {
      margin: 10px;
      width: 20%;
      padding: 15px;
    }
    button {
      margin-top: 20px;
      width: 10%;
      cursor: pointer;
    }
    p {
      margin-top: 40px;
      font-size: 13px;
    }
    p a {
      text-decoration: underline;
      cursor: pointer;
    }
  </style>
