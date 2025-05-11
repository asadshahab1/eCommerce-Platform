
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-navy-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="/products" className="hover:text-coral-400 transition">All Products</a></li>
                <li><a href="/products?category=electronics" className="hover:text-coral-400 transition">Electronics</a></li>
                <li><a href="/products?category=clothing" className="hover:text-coral-400 transition">Clothing</a></li>
                <li><a href="/products?category=accessories" className="hover:text-coral-400 transition">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="mb-4">Sign up for our newsletter to receive updates and special offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md flex-grow text-navy-900"
                />
                <button className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-navy-600 text-center">
            <p>&copy; {new Date().getFullYear()} ShopStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
