<script setup lang="ts">
const { style = 'default' } = defineProps<{ style?: 'default' }>()
</script>

<template>
  <div :class="['a-button', style]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.a-button {
  display: inline-block;
  padding: 8px 12px;
  background: lightblue;
  color: #000;
}
</style>
