<script setup lang="ts">
import { auth, loginWithGoogle, logout } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'

const user = ref<User | null>(null)

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})

const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle()
  } catch (err) {
    console.error('Login failed:', err)
  }
}

const handleLogout = async () => {
  try {
    await logout()
  } catch (err) {
    console.error('Logout failed:', err)
  }
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-6 text-center" elevation="6" max-width="400">
      <h2 class="mb-4">Welcome</h2>

      <v-btn color="primary" prepend-icon="mdi-google" @click="handleGoogleLogin">
        Sign in with Google
      </v-btn>

      <v-divider class="my-4"></v-divider>

      <div v-if="user">
        <p>
          You are logged in as <b>{{ user.displayName }}</b>
        </p>
        <v-avatar size="64" class="my-2">
          <v-img :src="user.photoURL || ''" />
        </v-avatar>
        <v-btn color="red" @click="handleLogout">Logout</v-btn>
      </div>
    </v-card>
  </v-container>
</template>
