<script setup lang="ts">
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'

const user = ref<User | null>(null)

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})
</script>

<template>
  <RouterLink to="/auth">
    <v-avatar v-if="user" size="32" class="my-2">
      <v-img :src="user.photoURL || ''" />
    </v-avatar>
    <v-btn v-else color="red" rounded>LogIn</v-btn>
  </RouterLink>
</template>

<style lang="scss" scoped></style>
