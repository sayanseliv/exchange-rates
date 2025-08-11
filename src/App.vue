<template>
  <ComponentHeader :theme="theme" @toggle-theme="toggleTheme" />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import ComponentHeader from './components/ComponentHeader.vue'
import { onMounted, ref } from 'vue'

const theme = ref<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}
onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})
</script>
