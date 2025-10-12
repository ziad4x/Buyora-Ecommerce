import Button from '@/components/button'
import Image from 'next/image'


const HeroSection = () => {
    return (
        <section className='w-full    relative  text-white  overflow-hidden  '>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-900 w-full h-full' />
            <div className="flex flex-col lg:flex-row items-center justify-between relative w-full z-10 backdrop-blur-2xl bg-black/5 px-sm md:px-md lg:px-lg xl:px-xl py-3">
                <div className='flex flex-col items-center  '>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:text-start bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-300 bg-clip-text text-transparent'>Welcome to Our Store</h1>
                    <p className='mt-4 max-w-2xl text-center'>Discover the best products at unbeatable prices. Shop now and experience the difference!</p>
                    <Button title="Shop Now" className="mt-4" />
                </div>
                <div className={"transform translate-y-3 flex lg:justify-end justify-center"}>
                    <Image
                        src="/assets/images/Iphone Image.png"
                        width={500}
                        height={500}
                        alt="Hero Image"
                        className="object-contain lg:max-w-[70%] max-w-[50%] drop-shadow-2xl drop-shadow-primary    "
                    />
                </div>
            </div>
        </section>
    )
}

export default HeroSection