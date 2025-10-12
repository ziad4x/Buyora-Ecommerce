import { Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface WishlistState {
    wishlist: Product[];
    addItemToWishlist: (product: Product) => void;
    removeItemFromWishlist: (productId: number) => void;
    clearWishlist: () => void
}
export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlist: [],

            addItemToWishlist: (product: Product) =>
                set((state) => {
                    const exists = state.wishlist.find((item) => item.id === product.id);
                    if (exists) return state;
                    return { wishlist: [...state.wishlist, product] };
                }),

            removeItemFromWishlist: (productId: number) => set((state) => ({
                wishlist: state.wishlist.filter((item) => item.id !== productId),
            })),

            clearWishlist: () => set({ wishlist: [] }),

        }),
        {
            name: "wishlist-storage",
        }
    )
)