import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useWishlist } from '../components/WishlistContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock_status: boolean;
  image: string;
  category: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

const ProductList: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [inStock, setInStock] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/products/`)
      .then((res) => setProducts(res.data.results))
      .catch((err) => console.error('Error fetching products:', err));

    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/product-category/`)
      .then((res) => setCategories(res.data.results))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category.id === selectedCategory);
    }
    if (inStock) {
      filtered = filtered.filter((product) => product.stock_status);
    }
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [selectedCategory, inStock, priceRange, products]);

  const addToCart = (productId: number, quantity: number) => {
    axiosInstance
      .post('v1/cart/add_to_cart/', { product_id: productId, quantity })
      .then((response) => {
        console.log('Product added to cart:', response.data);
        toast.success('Product added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setInStock(false);
    setPriceRange([0, 5000]);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-2xl font-semibold">Filters</h2>
        <button
          onClick={toggleFilterSidebar}
          aria-label="Toggle Filters"
          className="text-gray-700 focus:outline-none"
        >
          {isFilterOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`${
            isFilterOpen ? 'block' : 'hidden'
          } lg:block lg:w-1/4 lg:mr-8 bg-gray-100 rounded-lg p-4 shadow-md transition-all duration-300`}
        >
          <button
            className="w-full bg-gray-200 py-2 mb-4 rounded lg:hidden"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock((prev) => !prev)}
                className="form-checkbox mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">In Stock</span>
            </label>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Category</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    selectedCategory === null ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block font-semibold mb-3">Price Range</label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>$ {priceRange[0]}</span>
              <span>$ {priceRange[1]}</span>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Products ({filteredProducts.length})
            </h2>
          </div>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlist.includes(product.id)}
                  onWishlistToggle={() => toggleWishlist(product)}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
