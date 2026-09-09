export type Role = 'ORGANIZER' | 'ATTENDEE'

export interface AuthResponse {
  token: string
  message: string
}

export interface ApiErrorBody {
  status?: number
  error?: string
  message?: string
  errors?: Record<string, string>
}

export interface EventItem {
  id: number
  title: string
  description: string
  date: string
  location: string
  ticketQuota: number
  ticketsBooked: number
  status: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
