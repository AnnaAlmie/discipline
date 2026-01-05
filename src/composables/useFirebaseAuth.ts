import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

interface UserData {
  uid: string
  displayName: string | null
  email: string | null
  accessToken: string | null
}

const userData = ref<UserData | null>(null)

export function useFirebaseAuth() {
  const isLoggedIn = computed(() => !!userData.value)
  console.log('userData useFirebaseAuth', userData.value, !!userData.value)

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/drive.appdata')

    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const accessToken = credential?.accessToken ?? null

    userData.value = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      accessToken,
    }

    return userData.value
  }

  async function logout() {
    await auth.signOut()
    userData.value = null
  }

  // 🔄 Auto-refresh token
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      userData.value = null

      return
    }

    // Refresh token immediately
    const tokenResult = await user.getIdTokenResult(true)
    userData.value = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      accessToken: tokenResult.token, // fallback, not Drive-scoped!
    }
    console.log('here', userData.value)

    // Ensure Drive-scoped token
    const credential = GoogleAuthProvider.credential(null, tokenResult.token)
    userData.value.accessToken = credential?.accessToken ?? null
  })

  async function refreshAccessToken() {
    if (!auth.currentUser) return null

    await auth.currentUser.getIdTokenResult(true)
    // Firebase gives ID token by default — but we need Drive scope
    // Workaround: re-authenticate silently if accessToken is missing
    if (!userData.value?.accessToken) {
      await loginWithGoogle()
    }
    return userData.value?.accessToken
  }
  console.log(userData.value, 'userData')

  return {
    userData,
    isLoggedIn,
    loginWithGoogle,
    logout,
    refreshAccessToken,
  }
}
