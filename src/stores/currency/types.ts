export interface CurrencyItemType {
  readonly r030: number
  readonly txt: string
  readonly rate: number
  readonly cc: string
  readonly exchangedate: string
}

export interface CurrencyState {
  list: readonly CurrencyItemType[]
  editedList: Record<string, CurrencyItemType>
}
