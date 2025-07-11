<template>
  <ComponentHeader />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import ComponentHeader from './components/ComponentHeader.vue'
</script>
