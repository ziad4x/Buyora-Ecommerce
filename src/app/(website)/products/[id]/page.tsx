import ProductDetails from '@/pages/products/productDetails';
import { Metadata } from 'next';

import React from 'react'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`);
    const product = await res.json();

    return {
        title: `${product.title} | Buyora - E-commerce`,
        description: `Details about ${product.title}`,
    };
}
const Page = async ({ params }: { params: { id: string } }) => {

    // console.log({ params });
    // console.log("++++++++++++", params.id)
    const { id } = params;
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await res.json();
    console.log(product);


    return (
        <ProductDetails product={product} />
    )
}

export default Page