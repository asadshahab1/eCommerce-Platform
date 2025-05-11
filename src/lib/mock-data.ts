
import { Product, Category, User, Order } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with noise cancellation. Comfortable fit for all-day use.',
    price: 249.99,
    salePrice: 199.99,
    category: 'electronics',
    image: '/placeholder.svg',
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your health metrics and stay connected on the go.',
    price: 189.99,
    category: 'electronics',
    image: '/placeholder.svg',
    rating: 4.5,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Designer Leather Wallet',
    description: 'Handcrafted genuine leather with multiple compartments.',
    price: 79.99,
    salePrice: 59.99,
    category: 'accessories',
    image: '/placeholder.svg',
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: 'Organic Cotton T-shirt',
    description: 'Eco-friendly and super soft for everyday comfort.',
    price: 34.99,
    category: 'clothing',
    image: '/placeholder.svg',
    rating: 4.3,
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled insulation keeps drinks hot or cold for hours.',
    price: 29.99,
    category: 'accessories',
    image: '/placeholder.svg',
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: 'Bluetooth Portable Speaker',
    description: 'Powerful sound in a compact, waterproof design.',
    price: 129.99,
    category: 'electronics',
    image: '/placeholder.svg',
    rating: 4.4,
    inStock: false
  },
  {
    id: 7,
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 artisan mugs, perfect for your morning brew.',
    price: 49.99,
    salePrice: 39.99,
    category: 'home',
    image: '/placeholder.svg',
    rating: 4.2,
    inStock: true
  },
  {
    id: 8,
    name: 'Minimalist Desk Lamp',
    description: 'Adjustable LED lamp with touch controls and USB charging port.',
    price: 69.99,
    category: 'home',
    image: '/placeholder.svg',
    rating: 4.5,
    inStock: true,
    featured: true
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Accessories',
    slug: 'accessories',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Home',
    slug: 'home',
    image: '/placeholder.svg'
  }
];

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'California',
      zipCode: '12345',
      country: 'USA'
    }
  }
];

export const orders: Order[] = [
  {
    id: 1,
    date: '2024-05-01',
    status: 'delivered',
    total: 259.98,
    items: [
      {
        product: products[2],
        quantity: 1
      },
      {
        product: products[4],
        quantity: 2
      }
    ]
  },
  {
    id: 2,
    date: '2024-05-08',
    status: 'shipped',
    total: 199.99,
    items: [
      {
        product: products[0],
        quantity: 1
      }
    ]
  }
];

export const featuredProducts = products.filter(product => product.featured);
