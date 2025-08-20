<script setup lang="ts">
import Header from './components/Navigation/Header.vue'
import Footer from './components/Navigation/Footer.vue'
</script>

<template>
  <Header />
  <div class="main-wrapper wrapper">
    <RouterView />
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
.main-wrapper {
  padding: 50px 0;
}
</style>
