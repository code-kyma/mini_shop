import { ref, computed } from 'vue'

export function useCart() {
  const cartItems = ref([])
  const showCart = ref(false)

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const increaseQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) item.quantity++
  }

  const decreaseQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item && item.quantity > 1) item.quantity--
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const checkout = () => {
    cartItems.value = []
    showCart.value = false
  }

  const toggleCart = () => {
    showCart.value = !showCart.value
  }

  return {
    cartItems,
    showCart,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    checkout,
    toggleCart
  }
}
