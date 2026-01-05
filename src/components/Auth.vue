<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import Button from '@/components/atoms/Button.vue'

const { userData, isLoggedIn } = useFirebaseAuth()
</script>

<template>
  <RouterLink to="/auth">
    <div v-if="isLoggedIn && userData" size="32" class="my-2">
      <img :src="userData.photoURL || ''" referrerpolicy="no-referrer" />
    </div>
    <Button v-else color="red" rounded>LogIn</Button>
  </RouterLink>
</template>

<style lang="scss" scoped></style>
