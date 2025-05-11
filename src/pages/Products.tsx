
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { products, categories } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

const Products = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 300,
    inStock: false,
    onSale: false,
    sortBy: 'featured',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: categoryParam
      }));
    }
  }, [location.search]);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price range filter
    result = result.filter(
      product => {
        const price = product.salePrice || product.price;
        return price >= filters.minPrice && price <= filters.maxPrice;
      }
    );
    
    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply on sale filter
    if (filters.onSale) {
      result = result.filter(product => product.salePrice !== undefined);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      
      switch (filters.sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.id - b.id;
      }
    });
    
    setFilteredProducts(result);
  }, [filters]);

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sortBy: value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 300,
      inStock: false,
      onSale: false,
      sortBy: 'featured',
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden md:block w-64 space-y-8">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <Button 
                variant={filters.category === '' ? "default" : "outline"} 
                size="sm"
                className="w-full justify-start"
                onClick={() => handleCategoryChange('')}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button 
                  key={category.id}
                  variant={filters.category === category.slug ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={300}
                step={10}
                minStepsBetweenThumbs={1}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${filters.minPrice}</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inStock" 
                checked={filters.inStock}
                onCheckedChange={(checked) => 
                  setFilters({...filters, inStock: checked === true})
                }
              />
              <label htmlFor="inStock" className="text-sm">In Stock Only</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="onSale" 
                checked={filters.onSale}
                onCheckedChange={(checked) => 
                  setFilters({...filters, onSale: checked === true})
                }
              />
              <label htmlFor="onSale" className="text-sm">On Sale</label>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </aside>

        {/* Filters Sidebar - Mobile */}
        <div 
          className={cn(
            "md:hidden border-b pb-4 mb-4 space-y-4",
            isFilterOpen ? "block" : "hidden"
          )}
        >
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={300}
                step={10}
                minStepsBetweenThumbs={1}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${filters.minPrice}</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mobileInStock" 
                checked={filters.inStock}
                onCheckedChange={(checked) => 
                  setFilters({...filters, inStock: checked === true})
                }
              />
              <label htmlFor="mobileInStock" className="text-sm">In Stock Only</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mobileOnSale" 
                checked={filters.onSale}
                onCheckedChange={(checked) => 
                  setFilters({...filters, onSale: checked === true})
                }
              />
              <label htmlFor="mobileOnSale" className="text-sm">On Sale</label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={clearFilters}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
