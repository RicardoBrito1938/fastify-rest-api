import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('User Should be able to create a new transaction ', async () => {
    const response = await request(app.server).post('/transactions').send({
      amount: 100,
      title: 'Salary',
      type: 'credit',
    })

    expect(response.status).toBe(201)
  })

  it('User Should be able to get list of transactions ', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        amount: 10000,
        title: 'Salary',
        type: 'credit',
      })

    const cookies = createTransactionsResponse.headers['set-cookie']

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
  })
})
