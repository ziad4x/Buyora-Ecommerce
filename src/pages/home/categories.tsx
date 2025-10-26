import Link from "next/link";
import React from "react";

const Categories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories", {
        next: { revalidate: 60 },
    });
    const categories = await res.json();
    const limitedCategories = categories.slice(0, 4);

    return (
        <section className="w-full flex flex-col items-center px-sm md:px-md lg:px-lg xl:px-xl py-12 gap-10 relative">
            {/* العنوان واللينك */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 relative">
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-center sm:text-left ">
                    Our Categories
                </h2>

                {/* <Link
                    href="/categories"
                    className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300 font-medium"
                >
                    See All Categories →
                </Link> */}
            </div>

            {/* شبكة التصنيفات */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {limitedCategories.map(
                    (category: { slug: string; name: string; url: string }, idx: number) => (
                        <div
                            key={idx}
                            className="group relative
                           dark:!bg-bg-dark-sec 
                         rounded-2xl p-6 flex flex-col items-center justify-center text-center
                         border border-gray-100/90 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-500
                         hover:-translate-y-2 hover:border-blue-500/50 overflow-hidden"
                        >
                            {/* تأثير الإضاءة عند الـ hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />

                            {/* المحتوى */}
                            <h3 className="relative z-10 text-xl md:text-2xl font-semibold capitalize text-black dark:text-white group-hover:text-black/80 dark:group-hover:text-white/70 transition">
                                {category.name}
                            </h3>

                            <p className="relative z-10 text-sm text-gray-400 mt-2 group-hover:text-gray-300">
                                Explore the best {category.slug.replace("-", " ")} deals
                            </p>

                            {/* سهم أنيميشن */}
                            <span className="absolute bottom-4 start-1 sm:start-4 text-blue-400 text-2xl group-hover:translate-x-2 transition-transform duration-300">
                                →
                            </span>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Categories;
