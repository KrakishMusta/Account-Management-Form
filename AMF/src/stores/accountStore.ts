import { defineStore } from 'pinia'
import { AccountRowPerformance } from '@/models/AccountRowPerformance'

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    records: [] as AccountRowPerformance[],
    lastId: 0
  }),
  actions: {
    addRecord(record: AccountRowPerformance) {
      this.records.push(record)
      this.saveToLocalStorage()
    },
    updateRecord(index: number, record: AccountRowPerformance) {
      this.records[index] = record
      this.saveToLocalStorage()
    },
    deleteRecord(index: number) {
      this.records.splice(index, 1)
      this.saveToLocalStorage()
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('accountRecords')
      if (saved) {
        const data = JSON.parse(saved)
        this.records = data.map((item: any) => 
          new AccountRowPerformance(item.tags, item.method, item.login, item.password)
        )
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('accountRecords', JSON.stringify(this.records))
    }
  },
  getters: {
    getRecords: (state) => state.records
  }
})