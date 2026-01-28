<template>
  <header class="header">
    <div class="container header-container">
      <div class="header-content">
        <div class="logo">
          <h1>🛍️ MiniShop</h1>
        </div>
        <div class="header-actions">
          <div class="search-bar">
            <input 
              :value="searchQuery" 
              @input="$emit('update:search-query', $event.target.value)"
              type="text" 
              placeholder="Search products..."
              @keyup.enter="filterProducts"
            >
            <button @click="filterProducts" class="search-btn">Search</button>
          </div>
          <div class="cart-icon" @click="toggleCart">
            <span class="cart-badge" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
            🛒
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    searchQuery: String,
    cartItems: Array
  },
  emits: ['update:search-query', 'filter', 'toggle-cart'],
  methods: {
    filterProducts() {
      this.$emit('filter')
    },
    toggleCart() {
      this.$emit('toggle-cart')
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  sticky: top;
  top: 0;
  z-index: 100;
}

.header-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  grid-column: 1 / -1;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.header-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex: 1;
  max-width: 600px;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.search-bar input {
  flex: 1;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
}

.search-btn {
  padding: 0.7rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.cart-icon {
  font-size: 1.8rem;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
}

.cart-icon:hover {
  transform: scale(1.1);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-actions {
    width: 100%;
    max-width: none;
  }

  .search-bar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.3rem;
  }

  .search-bar input {
    font-size: 0.85rem;
  }

  .cart-icon {
    font-size: 1.5rem;
  }
}
</style>
