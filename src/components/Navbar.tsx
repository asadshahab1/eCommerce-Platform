
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import Cart from './Cart';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-navy-800">
            ShopStore
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-navy-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-navy-600 transition-colors">
            Products
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-navy-600 transition-colors">
            My Account
          </Link>
        </nav>

        {/* Cart and User Icons */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Shopping Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
          
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" aria-label="User Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute top-16 inset-x-0 bg-background border-b",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container py-4 space-y-4">
          <Link 
            to="/"
            className="block py-2 text-base font-medium hover:text-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products"
            className="block py-2 text-base font-medium hover:text-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/dashboard"
            className="block py-2 text-base font-medium hover:text-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Account
          </Link>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
