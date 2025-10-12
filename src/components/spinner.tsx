import React from 'react'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin h-16 w-16 border-8 border-primary border-t-transparent rounded-full" />
        </div>
    )
}

export default Spinner