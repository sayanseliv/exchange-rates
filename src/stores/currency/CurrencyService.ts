import axios from 'axios'
import type { CurrencyItemType } from './types'

const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange'

export const CurrencyService = {
  async fetchByDate(date: string): Promise<CurrencyItemType[]> {
    const url = `${BASE_URL}?date=${date}&json`
    const response = await axios.get<CurrencyItemType[]>(url)
    return response.data
  },
}
