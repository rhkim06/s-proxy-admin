import { getAuth } from '@/service/auth'
import { useLocalStorage } from './useLocalStorage'

export const checkAuth = async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    return false
  } else {
    try {
      return await getAuth()
    } catch (err) {
      return false
    }
  }
}
