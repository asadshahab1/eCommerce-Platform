
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative h-60 w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {product.salePrice && (
            <div className="absolute top-2 right-2 bg-coral-500 text-white py-1 px-2 rounded-md text-xs font-semibold">
              SALE
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <span className="text-white font-semibold px-3 py-1 bg-gray-900 bg-opacity-70 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-medium text-card-foreground">{product.name}</h3>
          <div className="mt-2 flex items-center space-x-2">
            {product.salePrice ? (
              <>
                <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                <span className="old-price">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="mt-2 flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
          </div>
          <div className="mt-4 flex-grow flex items-end">
            <Button 
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              variant={product.inStock ? "default" : "outline"}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
