<template>
    <div class="sign-up">
      <p>Let's create a new account !</p>
      <input type="text" placeholder="Email" v-model="email"><br>
      <input type="password" placeholder="Password" v-model="password"><br>
      <button @click="signUp">Sign Up</button>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>

<script>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/main'

export default {
  name: 'signUp',
  setup () {
    const email = ref('')
    const password = ref('')

    const signUp = () => {
      const userEmail = email.value
      const userPassword = password.value

      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          alert('Your account has been created !')
        })
        .catch((error) => {
          console.error(error)
          alert('Oops. ' + error.message)
        })
    }

    return {
      email,
      password,
      signUp
    }
  }
}
</script>

<style scoped>
  .sign-up {
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
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
