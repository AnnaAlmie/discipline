import { useAuthStore } from '@/stores/firebaseAuth'

export const useFirebaseAuth = () => {
  const store = useAuthStore()

  const userData = computed(() => store.userData)
  const isLoggedIn = computed(() => !!store.userData)

  const handleGoogleLogin = async () => {
    try {
      await store.loginWithGoogle()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await store.logoutWithGoogle()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return {
    userData,
    isLoggedIn,
    handleGoogleLogin,
    handleLogout,
  }
}
