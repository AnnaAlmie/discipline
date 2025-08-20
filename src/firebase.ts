// Import Firebase SDK
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: 'AIzaSyCEGqT_Kz27mML-1j7IhgG_-_T6AkY2kcY',
  authDomain: 'discipline-4ea7c.firebaseapp.com',
  projectId: 'discipline-4ea7c',
  storageBucket: 'discipline-4ea7c.firebasestorage.app',
  messagingSenderId: '842811280303',
  appId: '1:842811280303:web:bd7f0d085ca9c214423d5a',
  measurementId: 'G-KMGDL92LNF',
}

// Init Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Functions
const loginWithGoogle = () => signInWithPopup(auth, provider)
const logout = () => signOut(auth)

export { auth, loginWithGoogle, logout }
