"use client";
import { Product } from "@/interfaces";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./button";
import { useCartStore } from "@/store/useCartStore";

// interface ProductCardProps {
//     product: {
//         id: number;
//         title: string;
//         description?: string;
//         price?: number;
//         discountPercentage?: number;
//         rating?: number;
//         stock?: number;
//         brand?: string;
//         category?: string;
//         thumbnail?: string;
//         images?: string[];
//     };
// }
interface ProductCardProps {
    product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCartStore()
    const thumbnail = product.thumbnail;
    const hoveredImage =
        product.images && product.images.length > 0 && product.images[1]
            ? product.images[1]
            : product.thumbnail;

    const [image, setImage] = React.useState(thumbnail);
    const { wishlist, addItemToWishlist, removeItemFromWishlist } = useWishlistStore();
    const handleMouseEnter = () => setImage(hoveredImage);
    const handleMouseLeave = () => setImage(thumbnail);

    const inWhishlist = wishlist.some(item => item.id === product.id)
    const toggleWishList = (e: React.MouseEvent) => {
        e.preventDefault();
        const ProductWithType: Product = {
            id: product.id,
            title: product.title,
            price: product.price ?? 0,
            image: product.thumbnail,
            description: product.description,
            category: product.category,
            rating: product.rating,

        }
        if (inWhishlist) {
            removeItemFromWishlist(product.id)
        } else {
            addItemToWishlist(ProductWithType)
        }
    }
    return (
        <div
            className="group relative cursor-pointer w-full flex flex-col items-center justify-center text-center py-3 rounded-2xl bg-gray-200/40 dark:bg-gradient-to-t from-primary/20 to-black dark:bg-bg-dark-sec border border-gray-100/90 dark:border-white/10 shadow-md dark:shadow-primary transition-all duration-500"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

        >
            <Link href={`/products/${product.id}`} className="w-full">
                <div className="relative w-full flex justify-center">
                    <Image
                        key={image} // ✅ ده أهم تعديل
                        src={image!}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain h-48 w-full mb-4 group-hover:scale-125 transition-all duration-500"
                    />
                </div>

                <div className="px-4 w-full">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {product.title}
                    </h2>
                </div>

                <div className="px-4 w-full mb-2">
                    {product.discountPercentage ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                            </span>
                            <span className="text-sm text-gray-800 dark:text-white font-bold">
                                $
                                {Math.round(
                                    product.price! -
                                    (product.price! * product.discountPercentage!) / 100
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-800 dark:text-white">
                            ${product.price}
                        </span>
                    )}
                </div>

                <div className="px-4 w-full mb-3">
                    {product.stock && product.stock > 0 ? (
                        <span className="text-sm text-green-600 font-medium">
                            In Stock
                        </span>
                    ) : (
                        <span className="text-sm text-red-600 font-medium">
                            Out of Stock
                        </span>
                    )}
                </div>

                <Button title="Add to Cart" className="w-10/12 mx-auto bg-gradient-to-r  from-primary/50 via-indigo-400 to-cyan-500/50
             text-white font-semibold py-2 rounded-full shadow-md 
             hover:shadow-lg hover:scale-105 active:scale-95 
             transition-all duration-300 ease-in-out"

                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                />
            </Link>

            <div className="absolute top-3 right-3 group cursor-pointer">
                {
                    inWhishlist ? (
                        <Heart onClick={toggleWishList} className="text-red-500 fill-red-500 hover:text-gray-100 transition-colors duration-300" />
                    ) : <Heart onClick={toggleWishList} className="group-hover:text-red-500 transition-colors duration-300" />
                }

            </div>
        </div>
    );
};

export default ProductCard;
