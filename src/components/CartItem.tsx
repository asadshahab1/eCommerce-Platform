
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const price = product.salePrice || product.price;
  const subtotal = price * quantity;

  return (
    <div className="flex py-4 border-b">
      <Link to={`/product/${product.id}`} className="shrink-0 h-20 w-20 rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link to={`/product/${product.id}`} className="font-medium text-navy-800 hover:text-navy-600">
            {product.name}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          ${price.toFixed(2)} each
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="font-medium">${subtotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
