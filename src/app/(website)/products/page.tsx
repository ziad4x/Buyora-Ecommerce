'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/productCard';
import Pagination from '@/components/pagination';
import CardSkeleton from '@/components/cardSkeleton';
import { Product } from '@/interfaces';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string>('All Products');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://dummyjson.com/products/categories');
      const categoriesData = await res.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
        if (selectedCategories && selectedCategories !== 'All Products') {
          url = `https://dummyjson.com/products/category/${selectedCategories}?limit=${limit}&skip=${(page - 1) * limit}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.products);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => abortController.abort();
  }, [selectedCategories, page]);

  const totalPages = Math.ceil(totalItems / limit);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(category);
    setPage(1);
  };

  const categoriesWithAll = ['All Products', ...categories];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="dark:bg-bg-dark dark:text-white bg-bg-pri min-h-screen text-black px-sm md:px-md lg:px-lg xl:px-xl py-10 flex flex-col md:flex-row gap-10 md:gap-4 overflow-x-hidden w-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-[18%] md:w-fit bg-white/5 dark:bg-black/30 rounded-2xl shadow-md border border-border-dark dark:border-border-dark p-5 h-fit">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Categories</h2>
        <ul className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 custom-scroll">
          {categoriesWithAll.map((category, idx: number) => (
            <li key={idx} className="flex items-center gap-3 text-sm md:text-base">
              <input
                type="radio"
                checked={selectedCategories === category}
                onChange={() => handleCategoryChange(category)}
                className="accent-primary cursor-pointer"
                id={`cat-${idx}`}
              />
              <label
                htmlFor={`cat-${idx}`}
                className="capitalize cursor-pointer hover:text-primary transition duration-300"
              >
                {category}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Grid */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{selectedCategories}</h2>
          <p className="text-gray-500">
            Page {page} / {totalPages || 1}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-gray-400 text-center w-full py-10">No products found.</p>
          )}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default ProductsPage;
