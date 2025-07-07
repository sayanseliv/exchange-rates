<template>
  <main class="currency-edit">
    <section class="container">
      <div v-if="originalCurrency">
        <h1>
          Редагування валюти <span class="primary">{{ originalCurrency.cc }}</span>
        </h1>
        <div class="currency-edit__form">
          <label id="currencyEdit" class="currency-edit__label"
            >Курс:
            <input v-model="editableRate" type="number" />
          </label>
          <button class="currency-edit__btn" @click="save">Зберегти</button>
        </div>

        <p>
          Назва: <span class="primary">{{ originalCurrency.txt }}</span>
        </p>

        <p>
          Код: <span class="primary">{{ originalCurrency.cc }}</span>
        </p>
      </div>
      <div v-else>Валюта не знайдена.</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useCurrencyStore } from '@/stores/currency/currency'
import { ref, computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const cc = route.params.cc as string

const currencyStore = useCurrencyStore()

const originalCurrency = computed(() => currencyStore.list.find((item) => item.cc === cc))

const editableRate = ref<number | null>(null)

watch(
  originalCurrency,
  (val) => {
    if (val) editableRate.value = val.rate
  },
  { immediate: true },
)

const save = () => {
  if (!originalCurrency.value || editableRate.value == null) return

  const edited = {
    ...originalCurrency.value,
    rate: editableRate.value,
  }

  currencyStore.saveEditedCurrency(edited)

  router.push({ name: 'changed-exchange' })
}
</script>

<style>
.currency-edit {
  padding-block: 2rem;
  color: var(--white);
}
.currency-edit__form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.currency-edit__label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 20rem;
}
.currency-edit__label > input {
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.currency-edit__btn {
  align-self: flex-end;
  padding: 0.5rem 0.2rem;
  border-radius: 5px;
  background-color: var(--blue);
  color: var(--white);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.currency-edit__btn:hover {
  background-color: var(--blue-lighten-1);
}
</style>
