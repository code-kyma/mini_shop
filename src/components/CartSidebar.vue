<template>
  <aside v-if="showCart" class="cart-sidebar">
    <div class="cart-header">
      <h3>Shopping Cart</h3>
      <button @click="$emit('toggle-cart')" class="close-btn">✕</button>
    </div>
    
    <div v-if="cartItems.length > 0" class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-price">${{ item.price }}</p>
        </div>
        <div class="item-quantity">
          <button @click="$emit('decrease-quantity', item.id)" class="qty-btn">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="$emit('increase-quantity', item.id)" class="qty-btn">+</button>
        </div>
        <button @click="$emit('remove-from-cart', item.id)" class="remove-btn">🗑️</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
    </div>

    <div v-if="cartItems.length > 0" class="cart-footer">
      <div class="cart-total">
        <strong>Total: ${{ cartTotal.toFixed(2) }}</strong>
      </div>
      <button @click="$emit('checkout')" class="checkout-btn">Checkout</button>
      <button @click="$emit('clear-cart')" class="clear-btn">Clear Cart</button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'CartSidebar',
  props: {
    cartItems: Array,
    showCart: Boolean,
    cartTotal: Number
  },
  emits: ['toggle-cart', 'increase-quantity', 'decrease-quantity', 'remove-from-cart', 'checkout', 'clear-cart']
}
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 350px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 200;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  align-items: center;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.item-price {
  color: #667eea;
  font-weight: 700;
  font-size: 0.95rem;
}

.item-quantity {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.qty-btn {
  width: 28px;
  height: 28px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #667eea;
  color: white;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.empty-cart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  text-align: center;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 2px solid #f0f0f0;
  background: #f9f9f9;
}

.cart-total {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #667eea;
}

.checkout-btn, .clear-btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.checkout-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.clear-btn {
  background: #f0f0f0;
  color: #333;
}

.clear-btn:hover {
  background: #e0e0e0;
}

@media (max-width: 1024px) {
  .cart-sidebar {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
  }
}
</style>
