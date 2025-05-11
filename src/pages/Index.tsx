
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { featuredProducts, categories } from '@/lib/mock-data';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Shop our curated collection of premium products. Free shipping on orders over $50.
            </p>
            <div className="mt-8 space-x-4">
              <Link to="/products">
                <Button className="bg-navy-800 hover:bg-navy-900">
                  Shop Now
                </Button>
              </Link>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-navy-50 to-coral-50 p-8 rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Featured product"
              className="w-full h-auto object-cover rounded"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-muted">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-navy-600 hover:text-navy-800 font-medium">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Promotional Banner */}
      <section className="py-12">
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-lg text-white p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
            <p className="text-lg mb-6">Get up to 40% off on selected items. Limited time offer.</p>
            <Link to="/products">
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                Shop Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-l-md border px-4 py-2"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
