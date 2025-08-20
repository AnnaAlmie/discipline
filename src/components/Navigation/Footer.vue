<script setup lang="ts">
import Auth from '@/components/Auth.vue'
const route = useRoute()
</script>

<template>
  <footer class="main-footer flex-center">
    <div class="wrapper flex-between">
      <RouterLink to="/" :class="{ disabled: route.name === 'home' }">
        <v-btn variant="text" rounded>Home</v-btn>
      </RouterLink>
      <Auth />
    </div>
  </footer>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
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
