import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import CurrencyEdit from '../views/CurrencyEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/changed-exchange',
      name: 'changed-exchange',
      component: () => import('@/views/ChangedExchange.vue'),
    },
    {
      path: '/search-currency',
      name: 'search-currency',
      component: () => import('@/views/SearchCurrency.vue'),
    },
    { path: '/currency/:cc', name: 'currency-edit', component: CurrencyEdit, props: true },
  ],
})

export default router
