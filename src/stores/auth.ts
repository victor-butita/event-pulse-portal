import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, getStoredToken, setStoredToken } from '@/api/client'
import type { AuthResponse, Role } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getStoredToken())
  const lastMessage = ref('')

  const isAuthenticated = computed(() => Boolean(token.value))

  async function register(email: string, password: string, role: Role) {
    const response = await api<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    })
    token.value = response.token
    lastMessage.value = response.message
    setStoredToken(response.token)
    return response
  }

  async function login(email: string, password: string) {
    const response = await api<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    token.value = response.token
    lastMessage.value = response.message
    setStoredToken(response.token)
    return response
  }

  function logout() {
    token.value = null
    lastMessage.value = ''
    setStoredToken(null)
  }

  return { token, lastMessage, isAuthenticated, register, login, logout }
})
