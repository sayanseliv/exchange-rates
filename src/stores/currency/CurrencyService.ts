import axios from 'axios'
import type { Currency } from './types'

const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange'

export const CurrencyService = {
  async fetchByDate(date: string): Promise<Currency[]> {
    const url = `${BASE_URL}?date=${date}&json`
    const response = await axios.get<Currency[]>(url)
    return response.data
  },
}
