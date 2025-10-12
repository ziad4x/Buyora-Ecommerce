import React from 'react'

const CardSkeleton = () => {
    return (
        <div className='animate-pulse bg-white dark:bg-gray-800 shadow-md rounded-2xl flex flex-col gap-4 p-5'>
            <div className='h-40 bg-gray-300 dark:bg-gray-500 rounded-xl' />
            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded-xl' />
            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded-xl' />
        </div>
    )
}

export default CardSkeleton