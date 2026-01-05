import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth'

export const useAuthStore = defineStore('AuthStore', () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCEGqT_Kz27mML-1j7IhgG_-_T6AkY2kcY',
    authDomain: 'discipline-4ea7c.firebaseapp.com',
    projectId: 'discipline-4ea7c',
    storageBucket: 'discipline-4ea7c.firebasestorage.app',
    messagingSenderId: '842811280303',
    appId: '1:842811280303:web:bd7f0d085ca9c214423d5a',
    measurementId: 'G-KMGDL92LNF',
  }
  const userData = ref<User | null>(null)
  let initialized = false

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const loginWithGoogle = () => signInWithPopup(auth, provider)
  const logoutWithGoogle = () => signOut(auth)

  const initAuth = () => {
    if (initialized) {
      return
    }
    onAuthStateChanged(auth, (u) => {
      userData.value = u
      initialized = true
    })
  }

  return { userData, auth, loginWithGoogle, logoutWithGoogle, initAuth }
})
