import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from '../views/ViewHome.vue'
import ViewCurrencyEdit from '../views/ViewCurrencyEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome,
    },
    {
      path: '/changed-exchange',
      name: 'changed-exchange',
      component: () => import('@/views/ViewChangedExchange.vue'),
    },
    {
      path: '/search-currency',
      name: 'search-currency',
      component: () => import('@/views/ViewSearchCurrency.vue'),
    },
    { path: '/currency/:cc', name: 'currency-edit', component: ViewCurrencyEdit, props: true },
  ],
})

export default router
