import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className='w-full p-sm md:p-md lg:p-lg xl:p-xl dark:bg-bg-dark bg-bg-pri min-h-screen flex flex-col animate-pulse'>
            <div className='h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-8' />

            <div className='flex flex-col md:flex-row items-center md:items-start gap-4 '>
                <div className='w-full md:w-2/3 flex flex-col items-center gap-4'>
                    <div className='bg-gray-300 dark:bg-gray-700 rounded-lg w-[300] h-[300]' />
                    <div className='flex gap-4'>
                        {
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className='bg-gray-300 dark:bg-gray-700 rounded-lg w-[100] h-[100]' />
                            ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4 md:flex-1 w-full'>
                    <div className='w-[30%] h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2' />
                    <div className='w-full h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 ' />
                    <div className='w-[50%]  h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 ' />


                    <div className='w-[20%]  h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 ' />
                    <div className='w-[20%]  h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 ' />
                    <div>
                        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-md" />
                            <div className="w-10 h-8 bg-gray-300 dark:bg-gray-700 rounded-md" />
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-md" />
                        </div>
                    </div>

                    <div className="mt-6 h-12 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-xl" />
                    <hr className="mt-5 border-gray-300 dark:border-gray-700" />





                </div>
            </div>
            <div className="mt-6 w-full">
                <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border-b border-gray-300 dark:border-gray-700 py-4">
                        <div className="h-4 w-1/5 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-3 w-1/6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default ProductSkeleton