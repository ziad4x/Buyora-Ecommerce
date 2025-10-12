"use client";
import { Product } from "@/interfaces";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import React from "react";

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
    const [image, setImage] = React.useState(product?.thumbnail);
    const [count, setCount] = React.useState(1);
    const [disabled, setDisabled] = React.useState(false);
    const { addToCart } = useCartStore();

    const discountedPrice = product?.discountPercentage
        ? Math.round(product?.price - (product?.price * product?.discountPercentage) / 100)
        : product?.price;

    // دالة منظمة للتحكم في الكمية
    const handleDecrease = () => {
        setCount((prev) => (prev > 1 ? prev - 1 : 1));

    };


    const handleIncrease = () => {
        const maxCount = Math.min(product?.stock ?? 0, 10);
        setCount((prev) => (prev < maxCount ? prev + 1 : prev));
    };

    return (
        <div className="w-full p-sm md:p-md lg:p-lg xl:p-xl dark:bg-bg-dark dark:text-white bg-bg-pri min-h-screen text-black flex flex-col ">
            <h1 className="text-3xl font-bold ">{product?.title}</h1>

            <div className="flex flex-col md:flex-row items-center justify-evenly gap-10">
                {/* -------- Images Section -------- */}
                <div className="w-full md:w-1/2 flex flex-col  items-center">
                    {/* الصورة الكبيرة */}
                    <Image
                        src={image!}
                        alt={product?.title}
                        width={300}
                        height={300}
                        className="  "
                    />

                    {/* الصور المصغرة */}
                    <div className="flex gap-3 justify-center flex-wrap">
                        {product?.images?.slice(0, 4).map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`${product?.title} image ${index + 1}`}
                                width={100}
                                height={100}
                                onClick={() => setImage(img)}
                                className={`w-24 h-24 object-cover cursor-pointer rounded-lg border-2 transition-all duration-200 ${img === image
                                    ? "border-primary scale-105"
                                    : "border-transparent hover:opacity-80"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* -------- Details Section -------- */}
                <div className="flex flex-col gap-5 w-full md:w-1/2">
                    {/* الوصف */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 dark:text-gray-300">{product?.description}</p>
                    </div>

                    {/* السعر */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Price</h2>
                        {product?.discountPercentage ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xl text-gray-400 line-through">
                                    ${product?.price}
                                </span>
                                <span className="text-3xl font-bold text-primary">
                                    ${discountedPrice}
                                </span>
                                <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                                    -{product?.discountPercentage}%
                                </span>
                            </div>
                        ) : (
                            <span className="text-3xl font-bold text-primary">${product?.price}</span>
                        )}
                    </div>

                    {/* التصنيف */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Category</h2>
                        <p className="capitalize text-gray-700 dark:text-gray-300">
                            {product?.category}
                        </p>
                    </div>

                    {/* الكمية */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Quantity</h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleDecrease}
                                className="bg-primary text-white px-4 py-2 rounded-md text-lg font-bold hover:opacity-80 transition"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold w-10 text-center">{count}</span>
                            <button
                                onClick={handleIncrease}
                                disabled={count >= Math.min(product?.stock ?? 0, 10)}
                                className="bg-primary text-white px-4 py-2 rounded-md text-lg font-bold hover:opacity-80 transition"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {product?.stock ?? 0 - count} items left in stock
                        </p>
                    </div>

                    {/* زر الإضافة للسلة */}
                    <button onClick={() => addToCart(product)} className="mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition w-full md:w-[50%] cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
            <hr className="mt-5" />
            <div>
                <h2 className="text-2xl font-semibold mt-2">Reviews</h2>
                {
                    product?.reviews && product?.reviews?.map((review, index) => {
                        return (
                            <div key={index} className="border-b border-gray-300 py-4">
                                <p className="font-semibold">{review?.reviewerName}</p>
                                <p className="font-semibold text-sm text-gray-500">{review?.reviewerEmail}</p>
                                <p>{new Date(review?.date).toLocaleDateString()}</p>
                                <p className="text-yellow-500">{"★".repeat(review?.rating)}{"☆".repeat(5 - review?.rating)}</p>
                                <p className="text-gray-700 dark:text-gray-300">{review?.comment}</p>
                            </div>
                        )
                    }
                    )}

            </div>
        </div>
    );
};

export default ProductDetails;
