import Button from '@/components/button';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white w-full py-10 px-6 md:px-10 lg:px-16 relative bottom-0 mt-auto border-t-2 border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                {/* Logo Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-indigo-400 to-cyan-500 dark:to-cyan-300 bg-clip-text text-transparent">Buyora</h2>
                    <p className="text-gray-400 text-sm md:text-base ">
                        Discover a world of quality products and seamless shopping experiences.
                    </p>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-2 gap-6 text-center md:text-start 
    [&_li]:cursor-pointer 
    [&_li]:hover:underline 
    [&_li]:hover:underline-offset-4 
    [&_li]:hover:underline-primary 
    [&_li]:hover:text-primary 
    [&_li]:transition-all 
    [&_li]:duration-500">
                    <ul className="space-y-2">
                        <li className="">Home</li>
                        <li className="">Products</li>
                        <li className="">Categories</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="">About</li>
                        <li className="">Contact</li>
                        <li className="">Privacy Policy</li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col items-center md:items-end space-y-4">
                    <form
                        action=""
                        className="flex flex-col sm:flex-row md:flex-col items-center md:items-end gap-3 w-full sm:w-auto"
                    >
                        <input
                            type="email"
                            placeholder="Your email"
                            className="py-2 px-6 rounded-md w-full sm:w-64 md:w-full focus:outline-none text-black bg-bg-sec"
                        />
                        <Button
                            type="submit"
                            title="Subscribe"
                            className="!rounded-md !w-fit !py-2 px-2"
                        />
                    </form>
                </div>
            </div>

            {/* Divider & Bottom Text */}
            <div className="border-t border-gray-800 mt-10 pt-5 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Buyora. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
