<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'

const { userData, isLoggedIn, handleGoogleLogin, handleLogout } = useFirebaseAuth()
</script>

<template>
  <div>
    <h2 class="mb-4">Welcome</h2>

    <div v-if="isLoggedIn && userData">
      <p>
        You are logged in as <b>{{ userData.displayName }}</b>
      </p>
      <img :src="userData.photoURL || ''" referrerpolicy="no-referrer" />
      <Button color="red" @click="handleLogout">Logout</Button>
    </div>
    <Button v-else color="primary" prepend-icon="mdi-google" @click="handleGoogleLogin">
      Sign in with Google
    </Button>
  </div>
</template>
