import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useCurrencyStore } from './stores/currency/currency'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const currencyStore = useCurrencyStore()
const today = new Date()
const yyyy = today.getFullYear()
const mm = String(today.getMonth() + 1).padStart(2, '0')
const dd = String(today.getDate()).padStart(2, '0')
const formattedDate = `${yyyy}${mm}${dd}`

currencyStore.loadByDate(formattedDate)
currencyStore.loadEditedFromLocalStorage()
