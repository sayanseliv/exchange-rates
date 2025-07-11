import { axiosApi } from '@/api/axios-api-config' // ✅ импорт кастомного инстанса
import type { CurrencyItemType } from './types'

export const CurrencyService = {
  async fetchByDate(date: string): Promise<readonly CurrencyItemType[]> {
    const response = await axiosApi.get<readonly CurrencyItemType[]>('/exchange', {
      params: {
        date,
        json: '',
      },
    })
    return response.data
  },
}
