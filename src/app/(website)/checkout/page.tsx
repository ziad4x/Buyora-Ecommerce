"use client";

import Spinner from "@/components/spinner";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus } from "lucide-react";
import React from "react";

const CheckoutPage = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {

        setMounted(true);
    }, []);


    if (!mounted) {
        return <Spinner />;
    }


    const total = parseFloat(
        cart
            .reduce((acc, item) => {
                const discount = item.discountPercentage || 0;
                const discountedPrice = item.price - (item.price * discount) / 100;
                return acc + discountedPrice * (item.quantity ?? 1);

            }, 0)
            .toFixed(2)
    );

    return (
        <div className="w-full min-h-screen p-sm md:p-md lg:p-lg xl:p-xl flex flex-col gap-8 lg:flex-row items-start bg-bg-pri dark:bg-bg-dark text-black dark:text-white">
            {/* Left - Cart Summary */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6 bg-white dark:bg-bg-dark/40 rounded-2xl border border-gray-400/30 shadow-lg p-6 transition-all">
                <h2 className="text-3xl font-bold border-b pb-3">Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">Your cart is empty</p>
                ) : (
                    <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto custom-scroll lg:p-5 p-5 ">
                        {cart.map((item) => {
                            const discountPrice = item.discountPercentage && item.discountPercentage > 0 && (
                                item.price - (item.price * item.discountPercentage) / 100
                            ).toFixed(2);

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center min-h-[100px] gap-4 bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg"
                                >
                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col ">
                                        <h3 className="font-semibold lg:text-lg hidden lg:block">{item.title}</h3>
                                        <h3 className="font-semibold block lg:hidden ">
                                            {item.title.split(" ").slice(0, 1).join(" ").length > 7
                                                ? item.title.split(" ").slice(0, 1).join(" ").slice(0, 7) + "..."
                                                : item.title.length > 15
                                                    ? item.title.slice(0, 14) + "..."
                                                    : item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ${item.discountPercentage && item.discountPercentage > 0 ? discountPrice : item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => decreaseQuantity?.(item.id)}
                                            className="lg:p-2 p-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold min-w-[30px] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity?.(item.id)}
                                            className="lg:p-2 p-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-600 p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center border-t pt-4 mt-2">
                    <p className="text-lg font-semibold">Total:</p>
                    <p className="text-2xl font-bold">${total}</p>
                </div>
            </div>

            {/* 💳 Right - Payment */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-white dark:bg-bg-dark/40 rounded-2xl border border-gray-400/30 shadow-lg p-6">
                <h2 className="text-3xl font-bold border-b pb-3">Payment</h2>

                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700/40 rounded-lg flex justify-between items-center">
                        <span className="font-medium">PayPal</span>
                        <span className="text-sm text-gray-500">Coming soon 💳</span>
                    </div>
                </div>

                <button
                    disabled={cart.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
