import CardSkeleton from '@/components/cardSkeleton';
import ProductCard from '@/components/productCard';
import { Product } from '@/interfaces';
import Link from 'next/link';
import React, { Suspense } from 'react';

// ✅ نعمل كومبوننت فرعي للـ Data
const ProductList = async () => {
    const res = await fetch("https://dummyjson.com/products/category/smartphones?limit=5", {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    const products = data.products.slice(0, 5);

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

const Products = () => {
    return (
        <section className='w-full p-sm md:p-md lg:p-lg xl:p-xl flex flex-col items-center justify-center gap-10'>
            <div className='w-full relative'>
                <h2 className='text-3xl md:text-4xl font-bold text-center'>Our Latest Products</h2>
                <p className='text-gray-500 text-center mt-2'>Explore our wide range of products</p>
                <div className='absolute top-3 end-0 flex justify-end ms-auto w-full text-primary'>
                    <Link
                        href='/products'
                        className='text-blue-500 hover:text-blue-600 hover:underline transition duration-300 font-medium'
                    >
                        <h3>See All Products <span>→</span></h3>
                    </Link>
                </div>
            </div>

            {/* ✅ نلف الكومبوننت الفرعي بـ Suspense */}
            <Suspense fallback={
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            }>

                <ProductList />
            </Suspense>
        </section>
    );
};

export default Products;
