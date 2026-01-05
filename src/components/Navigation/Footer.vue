<script setup lang="ts">
import Auth from '@/components/Auth.vue'
const route = useRoute()
import Button from '@/components/atoms/Button.vue'
</script>

<template>
  <footer class="main-footer flex-center">
    <div class="wrapper flex-between">
      <RouterLink to="/" :class="{ disabled: route.name === 'home' }">
        <Button variant="text" rounded>Home</Button>
      </RouterLink>
      <Auth />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.main-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 13;
  background: white;
}
</style>
