<template>
  <div class="app">
    <!-- Header Navigation -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>🛍️ MiniShop</h1>
          </div>
          <div class="header-actions">
            <div class="search-bar">
              <input 
                v-model="searchQuery" 
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

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Sidebar Filters -->
        <aside class="sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <div class="category-list">
              <button 
                v-for="category in categories" 
                :key="category"
                :class="['category-btn', { active: selectedCategory === category }]"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-filter">
              <input v-model.number="priceRange[0]" type="range" min="0" max="1000" step="10">
              <input v-model.number="priceRange[1]" type="range" min="0" max="1000" step="10">
              <div class="price-display">
                ${{ priceRange[0] }} - ${{ priceRange[1] }}
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3>Sort By</h3>
            <select v-model="sortBy" class="sort-select">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </aside>

        <!-- Products Grid -->
        <section class="products-section">
          <div class="products-header">
            <h2>{{ selectedCategory || 'All Products' }}</h2>
            <p class="product-count">{{ filteredProducts.length }} products found</p>
          </div>

          <div v-if="filteredProducts.length > 0" class="products-grid">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
              @view-details="viewProductDetails"
            />
          </div>
          <div v-else class="no-products">
            <p>No products found matching your criteria.</p>
            <button @click="resetFilters" class="reset-btn">Reset Filters</button>
          </div>
        </section>
      </div>
    </main>

    <!-- Shopping Cart Sidebar -->
    <aside v-if="showCart" class="cart-sidebar">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button @click="toggleCart" class="close-btn">✕</button>
      </div>
      
      <div v-if="cartItems.length > 0" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item.id)" class="qty-btn">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="qty-btn">+</button>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-btn">🗑️</button>
        </div>
      </div>
      <div v-else class="empty-cart">
        <p>Your cart is empty</p>
      </div>

      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-total">
          <strong>Total: ${{ cartTotal.toFixed(2) }}</strong>
        </div>
        <button @click="checkout" class="checkout-btn">Checkout</button>
        <button @click="clearCart" class="clear-btn">Clear Cart</button>
      </div>
    </aside>

    <!-- Product Details Modal -->
    <div v-if="selectedProduct" class="modal-overlay" @click="selectedProduct = null">
      <div class="modal" @click.stop>
        <button @click="selectedProduct = null" class="modal-close">✕</button>
        <div class="modal-content">
          <div class="modal-image">
            <div class="placeholder-image">{{ selectedProduct.emoji }}</div>
          </div>
          <div class="modal-details">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="modal-category">{{ selectedProduct.category }}</p>
            <p class="modal-price">${{ selectedProduct.price }}</p>
            <p class="modal-description">{{ selectedProduct.description }}</p>
            <p class="modal-rating">⭐ Rating: {{ selectedProduct.rating }}/5</p>
            <button @click="addToCart(selectedProduct)" class="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <transition name="fade">
      <div v-if="notification" :class="['notification', notification.type]">
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import ProductCard from './components/ProductCard.vue'
import { ref, computed } from 'vue'

export default {
  name: 'App',
  components: {
    ProductCard
  },
  setup() {
    // State
    const products = ref([
      // Electronics
      { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', description: 'High-quality wireless headphones with noise cancellation', rating: 4.8, emoji: '🎧' },
      { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', description: 'Feature-rich smartwatch with fitness tracking', rating: 4.7, emoji: '⌚' },
      { id: 3, name: 'USB-C Cable', price: 12.99, category: 'Electronics', description: 'Durable USB-C charging cable 6ft', rating: 4.5, emoji: '🔌' },
      { id: 4, name: 'Portable Charger', price: 34.99, category: 'Electronics', description: '20000mAh portable power bank', rating: 4.6, emoji: '🔋' },
      
      // Fashion
      { id: 5, name: 'Cotton T-Shirt', price: 24.99, category: 'Fashion', description: '100% organic cotton comfortable t-shirt', rating: 4.4, emoji: '👕' },
      { id: 6, name: 'Blue Jeans', price: 59.99, category: 'Fashion', description: 'Classic denim jeans with perfect fit', rating: 4.7, emoji: '👖' },
      { id: 7, name: 'Leather Jacket', price: 149.99, category: 'Fashion', description: 'Premium genuine leather jacket', rating: 4.9, emoji: '🧥' },
      { id: 8, name: 'Sneakers', price: 89.99, category: 'Fashion', description: 'Comfortable athletic sneakers', rating: 4.6, emoji: '👟' },
      
      // Home & Garden
      { id: 9, name: 'Coffee Maker', price: 44.99, category: 'Home & Garden', description: 'Automatic drip coffee maker with timer', rating: 4.5, emoji: '☕' },
      { id: 10, name: 'Plant Pot', price: 19.99, category: 'Home & Garden', description: 'Ceramic plant pot with drainage', rating: 4.3, emoji: '🪴' },
      { id: 11, name: 'Table Lamp', price: 39.99, category: 'Home & Garden', description: 'Modern LED table lamp with adjustable brightness', rating: 4.7, emoji: '💡' },
      { id: 12, name: 'Bed Sheets Set', price: 49.99, category: 'Home & Garden', description: 'Luxury cotton bed sheet set', rating: 4.8, emoji: '🛏️' },
      
      // Sports & Outdoors
      { id: 13, name: 'Yoga Mat', price: 29.99, category: 'Sports & Outdoors', description: 'Non-slip yoga and exercise mat', rating: 4.6, emoji: '🧘' },
      { id: 14, name: 'Bicycle Helmet', price: 54.99, category: 'Sports & Outdoors', description: 'Safety-certified bike helmet', rating: 4.8, emoji: '🚴' },
      { id: 15, name: 'Water Bottle', price: 19.99, category: 'Sports & Outdoors', description: 'Stainless steel water bottle 32oz', rating: 4.7, emoji: '💧' },
      { id: 16, name: 'Running Shoes', price: 99.99, category: 'Sports & Outdoors', description: 'Professional running shoes with cushioning', rating: 4.9, emoji: '🏃' },
      
      // Books & Media
      { id: 17, name: 'Programming Book', price: 39.99, category: 'Books & Media', description: 'Learn coding with hands-on projects', rating: 4.7, emoji: '📖' },
      { id: 18, name: 'Music Speakers', price: 74.99, category: 'Books & Media', description: 'Bluetooth speakers with 360° sound', rating: 4.6, emoji: '🔊' },
      { id: 19, name: 'Ebook Reader', price: 89.99, category: 'Books & Media', description: 'E-ink display for comfortable reading', rating: 4.8, emoji: '📚' },
      { id: 20, name: 'Microphone', price: 59.99, category: 'Books & Media', description: 'Professional USB microphone for streaming', rating: 4.7, emoji: '🎙️' },
    ])

    const categories = computed(() => {
      const cats = products.value.map(p => p.category)
      return ['All Products', ...Array.from(new Set(cats))]
    })

    const cartItems = ref([])
    const showCart = ref(false)
    const selectedProduct = ref(null)
    const searchQuery = ref('')
    const selectedCategory = ref('All Products')
    const priceRange = ref([0, 1000])
    const sortBy = ref('popular')
    const notification = ref(null)

    // Computed properties
    const filteredProducts = computed(() => {
      let filtered = products.value

      // Filter by category
      if (selectedCategory.value !== 'All Products') {
        filtered = filtered.filter(p => p.category === selectedCategory.value)
      }

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        )
      }

      // Filter by price range
      filtered = filtered.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

      // Sort
      if (sortBy.value === 'price-low') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy.value === 'price-high') {
        filtered.sort((a, b) => b.price - a.price)
      } else if (sortBy.value === 'newest') {
        filtered.sort((a, b) => b.id - a.id)
      }

      return filtered
    })

    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    // Methods
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
      
      showNotification(`${product.name} added to cart!`, 'success')
      selectedProduct.value = null
    }

    const removeFromCart = (productId) => {
      const index = cartItems.value.findIndex(item => item.id === productId)
      if (index > -1) {
        cartItems.value.splice(index, 1)
        showNotification('Item removed from cart', 'info')
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
      showNotification('Cart cleared', 'info')
    }

    const checkout = () => {
      showNotification(`Order placed! Total: $${cartTotal.value.toFixed(2)}`, 'success')
      cartItems.value = []
      showCart.value = false
    }

    const toggleCart = () => {
      showCart.value = !showCart.value
    }

    const viewProductDetails = (product) => {
      selectedProduct.value = product
    }

    const filterProducts = () => {
      // Trigger filter by updating the category or search
    }

    const resetFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = 'All Products'
      priceRange.value = [0, 1000]
      sortBy.value = 'popular'
    }

    const showNotification = (message, type = 'info') => {
      notification.value = { message, type }
      setTimeout(() => {
        notification.value = null
      }, 3000)
    }

    return {
      products,
      categories,
      cartItems,
      showCart,
      selectedProduct,
      searchQuery,
      selectedCategory,
      priceRange,
      sortBy,
      notification,
      filteredProducts,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      checkout,
      toggleCart,
      viewProductDetails,
      filterProducts,
      resetFilters
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  sticky: top;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
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

/* Main Content */
.main {
  padding: 2rem 0;
  min-height: calc(100vh - 100px);
}

.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* Sidebar */
.sidebar {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  sticky: top;
  top: 100px;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-section h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  padding: 0.6rem 1rem;
  background: #f0f0f0;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.category-btn:hover {
  background: #e0e0e0;
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

.price-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-filter input {
  width: 100%;
}

.price-display {
  text-align: center;
  font-weight: 600;
  color: #667eea;
  font-size: 0.95rem;
}

.sort-select {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

.sort-select:hover {
  border-color: #667eea;
}

/* Products Section */
.products-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.products-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
}

.products-header h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-count {
  color: #888;
  font-size: 0.95rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.no-products {
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
}

.no-products p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.reset-btn {
  padding: 0.7rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
}

/* Cart Sidebar */
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

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
}

.modal-content {
  display: flex;
  gap: 2rem;
}

.modal-image {
  flex-shrink: 0;
}

.placeholder-image {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}

.modal-details {
  flex: 1;
}

.modal-details h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.modal-category {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.modal-price {
  font-size: 1.8rem;
  color: #667eea;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.modal-rating {
  color: #888;
  margin-bottom: 1.5rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Notification */
.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 400;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.notification.success {
  background: #51cf66;
  color: white;
}

.notification.info {
  background: #4dabf7;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    height: auto;
    gap: 1rem;
  }

  .cart-sidebar {
    width: 100%;
    max-width: 400px;
  }
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

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .cart-sidebar {
    width: 100%;
  }

  .modal-content {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.3rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1rem;
  }

  .search-bar input {
    font-size: 0.85rem;
  }

  .cart-icon {
    font-size: 1.5rem;
  }
}
</style>
