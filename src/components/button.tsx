"use client"
import React from 'react'
interface Button {
    title: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string
    type?: "submit" | "reset" | "button"
}
const Button = ({ title, onClick, className, ...props }: Button) => {
    return (
        <button

            {...props}
            className={`px-6 py-3 bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-dark-hover cursor-pointer  text-white rounded  transition ${className}`}
            onClick={onClick}
        >{title}</button>
    )
}

export default Button