<template>
  <div class="home">
    <div class="content">
      <div class="welcome-section">
        <h1 class="welcome-title" v-if="greeting">{{ greeting }}, User!</h1>
        <p class="welcome-subtitle">Welcome to my Vue3 Firebase authentication project.</p>
      </div>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/main'

export default {
  name: 'HomeView',
  setup () {
    const router = useRouter()
    const greeting = ref('')

    onMounted(() => {
      const currentHour = new Date().getHours()

      if (currentHour < 12) {
        greeting.value = 'Good Morning'
      } else if (currentHour < 18) {
        greeting.value = 'Good Afternoon'
      } else {
        greeting.value = 'Good Evening'
      }
    })

    const logout = async () => {
      try {
        await signOut(auth)
        router.replace('/login')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      logout,
      greeting
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10vh;
  font-family: 'Arial', sans-serif;
}

.content {
  text-align: center;
  width: 80%;
  max-width: 800px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-title {
  color: #41B883;
  margin: 0;
  font-size: 2.5em;
}

.welcome-subtitle {
  color: #35495E;
  font-size: 1.2em;
}

.logout-button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  background-color: #41B883;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #2c8f73;
}
</style>
