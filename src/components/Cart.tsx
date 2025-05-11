
import React from 'react';
import { useCart } from '@/lib/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, itemCount, subtotal, clearCart } = useCart();

  // Close the cart when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-white">
            <h2 className="text-lg font-semibold">Your Cart ({itemCount})</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center bg-white">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground mt-1">Looks like you haven't added any products to your cart yet.</p>
                <Button className="mt-4" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
                
                {items.length > 0 && (
                  <div className="mt-4 flex justify-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Footer with totals and checkout */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4 bg-white">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Estimated Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link to="/checkout" onClick={onClose}>
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
