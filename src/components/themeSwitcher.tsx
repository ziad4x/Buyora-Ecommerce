"use client";
import { Moon, SunMedium } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<string | null>(null);

    // ✅ تهيئة الثيم فوراً أول ما الكومبوننت يتركب
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const activeTheme = storedTheme || (prefersDark ? "dark" : "light");

        setTheme(activeTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(activeTheme);
    }, []);

    const toggleTheme = () => {
        if (!theme) return;

        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        // ✅ شيل القديم وضيف الجديد
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
    };

    // ✅ لو لسه بيقرأ من localStorage
    if (!theme) return null;

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-500/30 rounded-full cursor-pointer transition-all hover:bg-gray-500/50 "
        >
            {theme === "dark" ? <SunMedium /> : <Moon />}
        </button>
    );
};

export default ThemeSwitcher;
