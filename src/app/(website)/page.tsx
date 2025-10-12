import Categories from "@/pages/home/categories";
import HeroSection from "@/pages/home/HeroSection";
import Products from "@/pages/home/products";


export default function Home() {

  return (
    <div className="  dark:bg-bg-dark dark:text-white bg-bg-pri min-h-screen text-black bg-contain w-full" >
      <main className="flex flex-col w-full">
        <HeroSection />
        <Categories />
        <Products />
      </main>
    </div>
  );
}
