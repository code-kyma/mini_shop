<template>
  <div class="app">
    <!-- Header Navigation -->
    <AppHeader 
      :search-query="searchQuery"
      :cart-items="cartItems"
      @update:search-query="searchQuery = $event"
      @filter="filterProducts"
      @toggle-cart="toggleCart"
    />

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Sidebar Filters -->
        <FilterSidebar 
          v-model="selectedCategory"
          :categories="categories"
          :price-range="priceRange"
          :sort-by="sortBy"
          @update:model-value="selectedCategory = $event"
          @update:price-range="priceRange = $event"
          @update:sort-by="sortBy = $event"
        />

        <!-- Products Grid -->
        <ProductsGrid 
          :filtered-products="filteredProducts"
          :selected-category="selectedCategory"
          @add-to-cart="handleAddToCart"
          @view-details="viewProductDetails"
          @reset-filters="resetFilters"
        />
      </div>
    </main>

    <!-- Shopping Cart Sidebar -->
    <CartSidebar 
      :cart-items="cartItems"
      :show-cart="showCart"
      :cart-total="cartTotal"
      @toggle-cart="toggleCart"
      @increase-quantity="increaseQuantity"
      @decrease-quantity="decreaseQuantity"
      @remove-from-cart="removeFromCart"
      @checkout="handleCheckout"
      @clear-cart="clearCart"
    />

    <!-- Product Details Modal -->
    <ProductModal 
      :selected-product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="handleAddToCart"
    />

    <!-- Notification Toast -->
    <NotificationToast :notification="notification" />
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'
import AppHeader from './components/AppHeader.vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductsGrid from './components/ProductsGrid.vue'
import CartSidebar from './components/CartSidebar.vue'
import ProductModal from './components/ProductModal.vue'
import NotificationToast from './components/NotificationToast.vue'
import { useProducts } from './composables/useProducts'
import { useCart } from './composables/useCart'
import { useNotification } from './composables/useNotification'

export default {
  name: 'App',
  components: {
    ProductCard,
    AppHeader,
    FilterSidebar,
    ProductsGrid,
    CartSidebar,
    ProductModal,
    NotificationToast
  },
  setup() {
    const { 
      products, 
      categories, 
      searchQuery, 
      selectedCategory, 
      priceRange, 
      sortBy, 
      filteredProducts,
      resetFilters 
    } = useProducts()

    const { 
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
    } = useCart()

    const { 
      notification, 
      showNotification 
    } = useNotification()

    const selectedProduct = ref(null)

    const handleAddToCart = (product) => {
      addToCart(product)
      showNotification(`${product.name} added to cart!`, 'success')
      selectedProduct.value = null
    }

    const viewProductDetails = (product) => {
      selectedProduct.value = product
    }

    const filterProducts = () => {
      // Trigger filter by updating the category or search
    }

    const handleCheckout = () => {
      showNotification(`Order placed! Total: $${cartTotal.value.toFixed(2)}`, 'success')
      checkout()
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
      handleAddToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      handleCheckout,
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

/* Main Content */
.main {
  padding: 2rem 0;
  min-height: calc(100vh - 100px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 1rem 0;
  }
}
</style>
