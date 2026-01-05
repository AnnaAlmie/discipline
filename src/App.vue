<script setup lang="ts">
import Header from './components/Navigation/Header.vue'
import Footer from './components/Navigation/Footer.vue'
import { useGoogleAppData } from '@/composables/useGoogleAppData'

const { save, load, loading, error } = useGoogleAppData()

async function saveData() {
  await save({
    theme: 'test',
    language: 'ua',
  })
}

async function loadData() {
  const data = await load()
  console.log(data)
}
</script>

<template>
  <Header />
  <div class="main-wrapper wrapper">
    <v-btn @click="saveData" :disabled="loading">Save</v-btn>
    <v-btn @click="loadData" :disabled="loading">Load</v-btn>
    <p v-if="error">{{ error }}</p>
    <RouterView />
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
.main-wrapper {
  padding: 50px 0;
}
</style>
