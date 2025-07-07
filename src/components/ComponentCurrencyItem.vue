<template>
  <router-link :to="{ name: 'currency-edit', params: { cc: item.cc } }" class="currency-item">
    <p>{{ item.txt }} — {{ item.rate }}</p>
    <time>{{ item.exchangedate }}</time>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  item: {
    r030: number
    cc: string
    rate: number
    txt: string
    exchangedate: string
  }
}>()
</script>
<style scoped>
.currency-item {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--blue);
  color: var(--black);
  background-color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.3s ease;
}
.currency-item > p,
.currency-item > time {
  position: relative;
  z-index: 1;
}
.currency-item::before {
  content: '';
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: var(--blue-lighten-1);
  transition: width 0.4s ease;
}

.currency-item:hover::before {
  width: 100%;
}

.currency-item:hover {
  color: var(--white);
}
</style>
