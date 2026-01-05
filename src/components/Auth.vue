<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'

const { userData, isLoggedIn } = useFirebaseAuth()
</script>

<template>
  <RouterLink to="/auth">
    <v-avatar v-if="isLoggedIn && userData" size="32" class="my-2">
      <v-img :src="userData.photoURL || ''" />
    </v-avatar>
    <v-btn v-else color="red" rounded>LogIn</v-btn>
  </RouterLink>
</template>

<style lang="scss" scoped></style>
