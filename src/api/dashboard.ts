import axios from 'axios'
import type { ITransactionResponse } from './dto/transaction.dto'
import type { IBurnsResponse, IEarningsResponse } from './dto/stats.dto'
import type { IBlockResponse } from './dto/block.dto'

export async function getTransactions(
  limit: number = 5,
  page: number = 1,
  since?: number,
): Promise<ITransactionResponse> {
  return axios
    .get(`${import.meta.env.VITE_APP_BACKEND_URL}/transactions`, {
      params: {
        limit,
        page,
        ...(since && { since }),
      },
    })
    .then((values) => {
      return values.data
    })
    .catch((e) => {
      console.log(e)
    })
}

export async function getBurns(): Promise<IBurnsResponse> {
  return axios
    .get(`${import.meta.env.VITE_APP_BACKEND_URL}/stats/burns`, {})
    .then((values) => {
      return values.data
    })
    .catch((e) => {
      console.log(e)
    })
}

export async function getEarnings(): Promise<IEarningsResponse> {
  return axios
    .get(`${import.meta.env.VITE_APP_BACKEND_URL}/stats/earnings`, {})
    .then((values) => {
      return values.data
    })
    .catch((e) => {
      console.log(e)
    })
}

export async function getBlocks(): Promise<IBlockResponse> {
  return axios
    .get(`${import.meta.env.VITE_APP_BACKEND_URL}/blocks`, {})
    .then((values) => {
      return values.data
    })
    .catch((e) => {
      console.log(e)
    })
}
