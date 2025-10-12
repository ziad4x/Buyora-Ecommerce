import { Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useWishlistStore } from "./useWishlistStore";

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    decreaseQuantity: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    addAllFromWishlist?: () => void
}
export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product: Product) =>
                set((state) => {
                    const existingProduct = state.cart.find(
                        (item) => item.id === product.id
                    );

                    if (existingProduct) {

                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                                    : item
                            ),
                        };
                    } else {

                        return {
                            cart: [...state.cart, { ...product, quantity: 1 }],
                        };
                    }
                }),
            removeFromCart: (productId: number) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                })),
            clearCart: () =>
                set(() => ({
                    cart: [],
                })),
            decreaseQuantity: (productId: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId && item.quantity && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                })),
            increaseQuantity: (productId: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    ),
                })),
            addAllFromWishlist: () => {
                const { wishlist, clearWishlist } = useWishlistStore.getState();

                set((state) => {
                    const newItems = wishlist.filter(
                        (item) => !state.cart.some((cartItem) => cartItem.id === item.id)
                    );

                    const updatedCart = [
                        ...state.cart,
                        ...newItems.map((item) => ({
                            ...item,
                            quantity: 1,
                        })),
                    ];


                    clearWishlist();

                    return { cart: updatedCart };
                });
            },


        }),
        {
            name: "cart-storage",
        }
    )
);
