export interface CurrencyItemType {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

export interface CurrencyState {
  list: CurrencyItemType[]
  editedList: Record<string, CurrencyItemType>
}
