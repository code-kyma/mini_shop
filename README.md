# MiniShop - Vue 3 Online Store 🛍️

A beautiful, modern, and fully functional e-commerce store built with **Vue 3** and **Vite**. Features a responsive product catalog with filtering, search, shopping cart, and checkout functionality.

## Features ✨

- **Product Catalog**: Browse 20+ products across 5 categories
- **Smart Filtering**: Filter by category, price range, and search query
- **Dynamic Sorting**: Sort by popularity, price, or newest
- **Shopping Cart**: Add/remove items, adjust quantities
- **Product Details**: View detailed product information in a modal
- **Responsive Design**: Beautiful UI on desktop, tablet, and mobile
- **Real-time Notifications**: Toast notifications for user actions
- **Modern UI**: Gradient design with smooth animations and transitions

## Categories

1. **Electronics** - Headphones, smartwatches, cables, chargers
2. **Fashion** - T-shirts, jeans, jackets, sneakers
3. **Home & Garden** - Coffee makers, plants, lamps, bedding
4. **Sports & Outdoors** - Yoga mats, helmets, water bottles, running shoes
5. **Books & Media** - Books, speakers, e-readers, microphones

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

## Project Setup

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The store will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
minishop/
├── src/
│   ├── components/
│   │   └── ProductCard.vue      # Individual product card component
│   ├── App.vue                   # Main application component
│   ├── main.js                   # Vue app entry point
│   └── style.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```

## Key Components

### App.vue
Main application component containing:
- Header with logo and search bar
- Sidebar with filters (category, price, sort)
- Product grid displaying filtered products
- Shopping cart sidebar
- Product details modal
- Toast notifications

### ProductCard.vue
Reusable component for displaying individual products:
- Product emoji/icon
- Rating badge
- Price display
- Add to cart and view details buttons
- Hover animations

## Features in Detail

### 🔍 Search & Filter
- Real-time product search
- Category filtering
- Price range slider
- Multiple sorting options

### 🛒 Shopping Cart
- Add/remove items
- Adjust quantities
- Real-time total calculation
- Clear cart functionality

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly buttons and controls

### 🎨 Beautiful UI
- Gradient color scheme (purple/blue)
- Smooth animations and transitions
- Professional styling
- Emoji-based product icons

## Color Scheme

- **Primary Gradient**: #667eea to #764ba2 (Purple/Blue)
- **Text**: #333 (Dark)
- **Accents**: #51cf66 (Success), #4dabf7 (Info)
- **Background**: #f5f5f5 (Light Gray)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- User authentication and profiles
- Order history and tracking
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for inventory management
- API integration for real products

## License

MIT

---

Built with ❤️ using Vue 3 and Vite
