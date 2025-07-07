<template>
  <main class="search-currency">
    <section class="container">
      <h1>Пошук курсу валют</h1>
      <div class="search-currency__filter">
        <label id="searchCurency" class="search-currency__label">Шукати валюту: </label>
        <input
          v-model="searchTerm"
          for="searchCurency"
          type="text"
          placeholder="Введіть назву валюти"
        />

        <label>Оберіть дату:</label>
        <VueDatePicker v-model="selectedDate" :enable-time-picker="false" format="yyyy-MM-dd" />
      </div>

      <ul class="search-currency__list">
        <li v-for="item in paginatedList" :key="item.r030">
          <CurrencyItem :item="item" />
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
        :container-class="'search-currency__pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link-item'"
        :prev-class="'prev-item'"
        :prev-link-class="'search-currency__prev-link'"
        :next-class="'next-item'"
        :next-link-class="'search-currency__next-link'"
        :break-view-link-class="'break-view-link'"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import CurrencyItem from '@/components/ComponentCurrencyItem.vue'
import ComponentPagination from '@/components/ComponentPagination.vue'
import { useCurrencyStore } from '@/stores/currency/currency'

const currencyStore = useCurrencyStore()

const selectedDate = ref(new Date())
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

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

watch(
  selectedDate,
  async (newDate) => {
    if (newDate) {
      const formatted = formatDate(newDate)
      await currencyStore.loadByDate(formatted)
      page.value = 1
    }
  },
  { immediate: true },
)

watch(searchTerm, () => {
  page.value = 1 //reset page
})
</script>

<style scoped>
.search-currency {
  padding-block: 2rem;
}
.search-currency > section > h1 {
  margin-bottom: 1rem;
  text-align: center;
}
.search-currency__filter {
  display: grid;
  grid-template-columns: repeat(2, 1fr auto);
  align-items: center;
  gap: 1rem;
  margin: 0 auto 1.5rem;
  max-width: fit-content;
}
.search-currency__filter > label {
  flex-shrink: 0;
}
.search-currency__label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 20rem;
}
.search-currency__label + input {
  min-height: 38px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.search-currency__list {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 50vw;
  margin: 0 auto 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--blue);
}
@media screen and (max-width: 640px) {
  .search-currency__list,
  .search-currency__filter {
    max-width: 100%;
  }
  .search-currency__filter {
    grid-template-columns: 1fr;
  }
}
</style>
