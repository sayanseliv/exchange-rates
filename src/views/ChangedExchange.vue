<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCurrencyStore } from '@/stores/currency/currency'
import CurrencyItem from '@/components/CurrencyItem.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const currencyStore = useCurrencyStore()

const page = ref(1)
const perPage = 10
const searchTerm = ref('')

onMounted(() => {
  currencyStore.loadEditedFromLocalStorage()
})

const editedArray = computed(() => Object.values(currencyStore.editedList))

const filteredEditedArray = computed(() => {
  return editedArray.value.filter((item) =>
    item.txt.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

const paginatedList = computed(() => {
  const start = (page.value - 1) * perPage
  const end = start + perPage
  return filteredEditedArray.value.slice(start, end)
})

const pageCount = computed(() => {
  return Math.ceil(filteredEditedArray.value.length / perPage)
})

const countHandler = (value: number) => {
  page.value = value
}

watch(searchTerm, () => {
  page.value = 1
})
</script>

<template>
  <main class="changed-exchange">
    <section class="container">
      <h1>Змінені курси</h1>

      <label class="changed-exchange__search"
        ><p>Шукати валюту:</p>
        <input v-model="searchTerm" type="text" placeholder="Введіть назву валюти"
      /></label>

      <ul class="changed-exchange__list">
        <li v-for="item in paginatedList" :key="item.r030">
          <CurrencyItem :item="item" />
        </li>
      </ul>

      <PaginationComponent
        v-if="pageCount > 1"
        v-model="page"
        :page-count="pageCount"
        :clickHandler="countHandler"
        :forcePage="page"
        :hideText="true"
        :page-range="3"
        :container-class="'changed-exchange__pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link-item'"
        :prev-class="'prev-item'"
        :prev-link-class="'changed-exchange__prev-link'"
        :next-class="'next-item'"
        :next-link-class="'changed-exchange__next-link'"
        :break-view-link-class="'break-view-link'"
      />
    </section>
  </main>
</template>
<style scoped>
.changed-exchange {
  padding-block: 2rem;
}
.changed-exchange > section > h1 {
  margin-bottom: 1rem;
  text-align: center;
}
.changed-exchange__search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 2rem;
}
.changed-exchange__search > p {
  flex-shrink: 0;
}
.changed-exchange__search > input {
  width: 100%;
  max-width: 20rem;
  min-height: 38px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.changed-exchange__list {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 50vw;
  margin: 0 auto 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--blue);
}
@media screen and (max-width: 640px) {
  .changed-exchange__list {
    max-width: 100%;
  }
}
</style>
