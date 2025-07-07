<template>
  <main class="home">
    <section class="container">
      <h1>Курс Валют на поточний день</h1>

      <label class="home__search"
        ><p>Шукати валюту:</p>
        <input v-model="searchTerm" type="text" placeholder="Введіть назву валюти"
      /></label>

      <ul class="home__list">
        <li v-for="item in paginatedList" :key="item.r030">
          <ComponentCurrencyItem :item="item" />
        </li>
      </ul>
      <ComponentPagination
        v-if="pageCount > 1"
        v-model="page"
        :page-count="pageCount"
        :clickHandler="countHandler"
        :forcePage="page"
        :hideText="true"
        :page-range="3"
        :container-class="'home__pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link-item'"
        :prev-class="'prev-item'"
        :prev-link-class="'home__prev-link'"
        :next-class="'next-item'"
        :next-link-class="'home__next-link'"
        :break-view-link-class="'break-view-link'"
      />
    </section>
  </main>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ComponentCurrencyItem from '@/components/ComponentCurrencyItem.vue'
import ComponentPagination from '@/components/ComponentPagination.vue'
import { useCurrencyStore } from '@/stores/currency/currency'

const currencyStore = useCurrencyStore()
const searchTerm = ref('')
const page = ref(1)
const perPage = 10

const filteredList = computed(() => {
  return currencyStore.list.filter((item) =>
    item.txt.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

const paginatedList = computed(() => {
  const start = (page.value - 1) * perPage
  const end = start + perPage
  return filteredList.value.slice(start, end)
})

const pageCount = computed(() => {
  return Math.ceil(filteredList.value.length / perPage)
})

const countHandler = (value: number) => {
  page.value = value
}

watch(searchTerm, () => {
  page.value = 1
})
</script>

<style scoped>
.home {
  padding-block: 2rem;
}
.home > section > h1 {
  margin-bottom: 1rem;
  text-align: center;
}
.home__search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 2rem;
}
.home__search > p {
  flex-shrink: 0;
}
.home__search > input {
  width: 100%;
  max-width: 20rem;
  min-height: 38px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.home__list {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 50vw;
  margin: 0 auto 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--blue);
}
@media screen and (max-width: 640px) {
  .home__list {
    max-width: 100%;
  }
}
</style>
