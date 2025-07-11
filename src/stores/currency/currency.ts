import { defineStore } from 'pinia'
import type { CurrencyState, CurrencyItemType } from './types'
import { CurrencyService } from './CurrencyService'

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    list: [],
    editedList: {},
  }),
  actions: {
    async loadByDate(date: string) {
      try {
        this.list = await CurrencyService.fetchByDate(date)
      } catch (error) {
        console.error('Error while getting exchange rate:', error)
      }
    },

    loadEditedFromLocalStorage() {
      const data = localStorage.getItem('edited-currencies')
      this.editedList = data ? JSON.parse(data) : {}
    },

    saveEditedCurrency(currency: CurrencyItemType) {
      this.editedList[currency.cc] = currency
      localStorage.setItem('edited-currencies', JSON.stringify(this.editedList))
    },
  },
})
