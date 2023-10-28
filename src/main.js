/* eslint-disable no-unused-vars */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

let vueApp

onAuthStateChanged(auth, user => {
  if (!vueApp) {
    vueApp = createApp(App)
      .use(router)
      .mount('#app')
  }
})

export { auth }
