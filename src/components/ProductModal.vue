<template>
  <div v-if="selectedProduct" class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <button @click="$emit('close')" class="modal-close">✕</button>
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
          <button @click="handleAddToCart" class="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    selectedProduct: Object
  },
  emits: ['close', 'add-to-cart'],
  methods: {
    handleAddToCart() {
      this.$emit('add-to-cart', this.selectedProduct)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>
