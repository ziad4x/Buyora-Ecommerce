"use client";
import { useCartStore } from "@/store/useCartStore";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity } = useCartStore();
    const total = parseFloat(
        cart.reduce((acc, item) => {
            const discount = item.discountPercentage || 0;
            const discountedPrice = item.price - (item.price * discount) / 100;
            return acc + discountedPrice * (item.quantity ?? 1);
        }, 0).toFixed(2)
    );

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-start justify-center lg:justify-end bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* الخلفية الداكنة */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* المودال */}
            <div
                className="relative top-20 
        w-[85%] sm:w-[70%] md:w-[50%] lg:w-1/4 
        mx-auto lg:mx-5 lg:end-10 
        max-h-[90vh] rounded-2xl shadow-lg border border-white/10 
        dark:bg-black/70 bg-white/80 text-black dark:text-white 
        backdrop-blur-2xl flex flex-col transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300/20 dark:border-white/10">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-3 flex flex-col gap-3">
                    <div className="max-h-[50vh] flex flex-col gap-2 overflow-y-auto px-3">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                                Your cart is empty 🛒
                            </p>
                        ) : (
                            cart.map((item) => {
                                const discountPrice = item.discountPercentage && (item.price - (item.price * item.discountPercentage) / 100).toFixed(2)
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between bg-gray-100/40 dark:bg-white/10
                  rounded-lg p-2 hover:scale-[1.02] transition-transform backdrop-blur-3xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={item.thumbnail! || item.image!}
                                                alt={item.title}
                                                className="w-12 h-12 object-contain rounded-md bg-white/20"
                                            />
                                            <div className="flex flex-col justify-center">
                                                <p className="font-medium text-sm">
                                                    {item.title.length > 20
                                                        ? item.title.slice(0, 20) + "..."
                                                        : item.title}
                                                </p>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    ${item.discountPercentage ? discountPrice : item.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-black dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item.id)}
                                                className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-black dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFromCart(item.id);
                                                }}
                                                className="text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-gray-300/20 dark:border-white/10 p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Total:
                            </span>
                            <span className="font-bold ">${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onNavigate={onClose}>
                            <button className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-primary/50 to-primary/80 via-purple-500/50 hover:bg-gradient-to-r hover:from-primary/80 hover:to-cyan-500/80 hover:via-purple-800 hover:opacity-90 transition-all">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
