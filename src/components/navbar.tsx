"use client";

import React, { useRef } from "react";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import ThemeSwitcher from "./themeSwitcher";
import WishListModal from "./wishlistModal";
import { useWishlistStore } from "@/store/useWishlistStore";
import CartModal from "./cartModal";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [wishlistOpen, setWishlistOpen] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(false);
    const { wishlist } = useWishlistStore();
    const { cart } = useCartStore();



    return (
        <>
            {/* Navbar */}
            <nav className='w-full h-auto py-4 lg:py-5 border-b flex items-center bg-navbar-light dark:bg-black/95 dark:backdrop-brightness-105 border-navbar-border-light dark:border-navbar-border-dark text-navbar-text dark:text-navbar-text-dark justify-between  px-sm md:px-md lg:px-lg xl:px-xl'>
                {/* Logo */}
                <Link href={'/'}>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-indigo-400 to-cyan-500 dark:to-cyan-300 bg-clip-text text-transparent py-1">
                        Buyora
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-6 font-medium">
                    <li className="hover:text-primary cursor-pointer transition">Home</li>
                    <li className="hover:text-primary cursor-pointer transition">About</li>
                    <li className="hover:text-primary cursor-pointer transition">Contact</li>
                </ul>

                {/* Right Icons */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Wishlist */}
                    <div className="relative cursor-pointer" onClick={() => {
                        setCartOpen(false)
                        setWishlistOpen(true)
                    }}>
                        <Heart size={28} />
                        {wishlist.length > 0 && (
                            <div className="absolute -top-1 -end-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                                {wishlist.length}
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <div className="relative cursor-pointer" onClick={() => {
                        setWishlistOpen(false)
                        setCartOpen(true)
                    }}>
                        <ShoppingCart size={28} />
                        {cart.length > 0 && (
                            <div className="absolute -top-1 -end-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                                {cart.length}
                            </div>
                        )}
                    </div>

                    {/* Theme Switch */}
                    <ThemeSwitcher />

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-1"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="fixed inset-0 h-full w-screen backdrop-blur-xl bg-gray-100/60 dark:bg-black/60 border-t border-navbar-border-light dark:border-navbar-border-dark lg:hidden flex flex-col items-center  gap-4 py-4 transition-all duration-300 z-[9999]  dark:text-white text-black">
                    <div className="flex flex-col items-center gap-6 font-medium translate-y-1/2 ">

                        <p className="hover:text-primary cursor-pointer">Home</p>
                        <p className="hover:text-primary cursor-pointer">About</p>
                        <p className="hover:text-primary cursor-pointer">Contact</p>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg mt-2">
                            Sign Up
                        </button>

                    </div>
                    <div className="absolute top-4 end-4 cursor-pointer" onClick={() => setMenuOpen(false)}>
                        <X size={20} className="text-gray-700 dark:text-gray-300" />

                    </div>
                </div>
            )}

            {/* Wishlist Modal */}
            {wishlistOpen && (

                <WishListModal visible={wishlistOpen} onClose={() => setWishlistOpen(false)} />
            )}
            {/* Cart Modal */}
            {
                cartOpen && (
                    <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                )
            }

        </>
    );
};

export default Navbar;
