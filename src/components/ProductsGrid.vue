<template>
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
        @add-to-cart="$emit('add-to-cart', product)"
        @view-details="$emit('view-details', product)"
      />
    </div>
    <div v-else class="no-products">
      <p>No products found matching your criteria.</p>
      <button @click="$emit('reset-filters')" class="reset-btn">Reset Filters</button>
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductsGrid',
  components: {
    ProductCard
  },
  props: {
    filteredProducts: Array,
    selectedCategory: String
  },
  emits: ['add-to-cart', 'view-details', 'reset-filters']
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1rem;
  }
}
</style>
