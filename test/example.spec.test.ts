import request from 'supertest'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('User Should be able to create a new transaction ', async () => {
  const response = await request(app.server).post('/transactions').send({
    amount: 100,
    title: 'Salary',
    type: 'credit',
  })

  expect(response.status).toBe(201)
})
