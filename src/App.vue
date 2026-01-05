<script setup lang="ts">
import Header from './components/Navigation/Header.vue'
import Footer from './components/Navigation/Footer.vue'
import { useGoogleAppData } from '@/composables/useGoogleAppData'
import Button from '@/components/atoms/Button.vue'

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
    <Button @click="saveData" :disabled="loading">Save</Button>
    <Button @click="loadData" :disabled="loading">Load</Button>
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
