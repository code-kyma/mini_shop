<template>
  <aside class="sidebar">
    <div class="filter-section">
      <h3>Categories</h3>
      <div class="category-list">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['category-btn', { active: modelValue === category }]"
          @click="$emit('update:modelValue', category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <h3>Price Range</h3>
      <div class="price-filter">
        <input 
          :value="priceRange[0]" 
          @input="$emit('update:price-range', [$event.target.valueAsNumber, priceRange[1]])"
          type="range" 
          min="0" 
          max="1000" 
          step="10"
        >
        <input 
          :value="priceRange[1]" 
          @input="$emit('update:price-range', [priceRange[0], $event.target.valueAsNumber])"
          type="range" 
          min="0" 
          max="1000" 
          step="10"
        >
        <div class="price-display">
          ${{ priceRange[0] }} - ${{ priceRange[1] }}
        </div>
      </div>
    </div>

    <div class="filter-section">
      <h3>Sort By</h3>
      <select 
        :value="sortBy" 
        @input="$emit('update:sort-by', $event.target.value)"
        class="sort-select"
      >
        <option value="popular">Most Popular</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FilterSidebar',
  props: {
    categories: Array,
    modelValue: String,
    priceRange: Array,
    sortBy: String
  },
  emits: ['update:modelValue', 'update:price-range', 'update:sort-by']
}
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .sidebar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    height: auto;
    gap: 1rem;
  }
}
</style>
