import { ref } from 'vue'

export function useNotification() {
  const notification = ref(null)

  const showNotification = (message, type = 'info') => {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  return {
    notification,
    showNotification
  }
}
