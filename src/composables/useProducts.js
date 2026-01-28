import { ref, computed } from 'vue'

export function useProducts() {
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

  const searchQuery = ref('')
  const selectedCategory = ref('All Products')
  const priceRange = ref([0, 1000])
  const sortBy = ref('popular')

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

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'All Products'
    priceRange.value = [0, 1000]
    sortBy.value = 'popular'
  }

  return {
    products,
    categories,
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    filteredProducts,
    resetFilters
  }
}
