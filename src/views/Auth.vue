<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'

const { userData, isLoggedIn, handleGoogleLogin, handleLogout } = useFirebaseAuth()
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-6 text-center" elevation="6" max-width="400">
      <h2 class="mb-4">Welcome</h2>

      <v-divider class="my-4"></v-divider>
      <div v-if="isLoggedIn && userData">
        <p>
          You are logged in as <b>{{ userData.displayName }}</b>
        </p>
        <v-avatar size="64" class="my-2">
          <v-img :src="userData.photoURL || ''" />
        </v-avatar>
        <v-btn color="red" @click="handleLogout">Logout</v-btn>
      </div>
      <v-btn v-else color="primary" prepend-icon="mdi-google" @click="handleGoogleLogin">
        Sign in with Google
      </v-btn>
    </v-card>
  </v-container>
</template>
