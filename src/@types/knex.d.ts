// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    transactions: {
      id: number
      title: string
      type: 'credit' | 'debit'
      amount: number
      createdAt: string
      session_Id?: string
    }
  }
}
