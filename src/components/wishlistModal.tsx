"use client";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const WishListModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    const { wishlist, removeItemFromWishlist } = useWishlistStore();
    const { addAllFromWishlist, clearCart } = useCartStore()


    if (!visible) return null;

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
                    <h2 className="text-xl font-semibold">Wishlist</h2>
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
                        {wishlist.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                                Your wishlist is empty
                            </p>
                        ) : (
                            wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-gray-100/40 dark:bg-white/10
                  rounded-lg p-2 hover:scale-[1.02] transition-transform backdrop-blur-3xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={item.image!}
                                            alt={item.title}
                                            className="w-12 h-12 object-contain rounded-md bg-white/20"
                                        />
                                        <div className="flex flex-col justify-center">
                                            <p className="font-medium text-sm">
                                                {item.title.length > 20
                                                    ? item.title.slice(0, 20) + "..."
                                                    : item.title}
                                            </p>
                                            {item.price && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    ${item.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeItemFromWishlist(item.id);
                                        }}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="border-t border-gray-300/20 dark:border-white/10 p-3">
                        <button className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-primary/50 to-primary/80 via-purple-500/50 hover:bg-gradient-to-r hover:from-primary/80 hover:to-cyan-500/80 hover:via-purple-800 hover:opacity-90 transition-all" onClick={() => addAllFromWishlist?.()}>
                            Move All to Cart 🛒
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default WishListModal;
