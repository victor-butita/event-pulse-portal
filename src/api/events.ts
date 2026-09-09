import { api } from '@/api/client'
import type { EventItem, PageResponse } from '@/types/api'

export function fetchHealth() {
  return api<{ status: string; service: string; timestamp: string }>('/api/v1/health')
}

export function fetchEvents(page = 0, size = 10) {
  return api<PageResponse<EventItem>>(`/api/events?page=${page}&size=${size}`)
}
