import React from 'react';
import ProductCard from './ProductCard';
import { useWishlist } from '../components/WishlistContext';
import { Product } from '../types/Product';

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, products } = useWishlist();

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist ({wishlist.length})</h2>
      {wishlistProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={true}
              onWishlistToggle={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
