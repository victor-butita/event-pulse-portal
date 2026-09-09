import axios from 'axios'
import type { ApiErrorBody } from '@/types/api'

const TOKEN_KEY = 'eventpulse.token'

export function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export class ApiError extends Error {
  status: number
  body: ApiErrorBody | null

  constructor(
    status: number,
    message: string,
    body: ApiErrorBody | null = null,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 0
    const body = (error.response?.data ?? null) as ApiErrorBody | null

    const message =
      body &&
      typeof body === 'object' &&
      'message' in body &&
      typeof body.message === 'string'
        ? body.message
        : error.message || `Request failed with status ${status}`

    throw new ApiError(status, message, body)
  },
)

export async function api<T>(
  path: string,
  config = {},
): Promise<T> {
  const response = await apiClient.request<T>({
    url: path,
    ...config,
  })

  return response.data
}