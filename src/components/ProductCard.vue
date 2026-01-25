<template>
  <div class="product-card">
    <div class="card-image">
      <div class="emoji-container">{{ product.emoji }}</div>
      <div class="rating-badge">⭐ {{ product.rating }}</div>
    </div>
    
    <div class="card-content">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-category">{{ product.category }}</p>
      <p class="product-desc">{{ product.description }}</p>
      
      <div class="product-footer">
        <span class="product-price">${{ product.price }}</span>
        <div class="card-actions">
          <button @click="addToCartClick" class="btn-add">Add</button>
          <button @click="viewDetailsClick" class="btn-view">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart', 'view-details'],
  methods: {
    addToCartClick() {
      this.$emit('add-to-cart', this.product)
    },
    viewDetailsClick() {
      this.$emit('view-details', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.emoji-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: transform 0.3s ease;
}

.product-card:hover .emoji-container {
  transform: scale(1.1);
}

.rating-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.3rem;
  line-height: 1.3;
  min-height: 1.5rem;
}

.product-category {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.product-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-add, .btn-view {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-view {
  background: #f0f0f0;
  color: #333;
}

.btn-view:hover {
  background: #e0e0e0;
}

@media (max-width: 480px) {
  .product-name {
    font-size: 0.9rem;
  }

  .product-desc {
    font-size: 0.75rem;
  }

  .card-actions {
    gap: 0.3rem;
  }

  .btn-add, .btn-view {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
}
</style>
