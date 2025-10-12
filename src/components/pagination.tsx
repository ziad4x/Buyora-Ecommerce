// Pagination.jsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number
}
const Pagination = ({ currentPage, totalPages, onPageChange, siblingCount = 1 }: PaginationProps) => {

    const genetratePageNumbers = (): (number | string)[] => {
        const totalPageNumber = siblingCount * 2 + 5
        const totalPageBlocks = totalPageNumber + 2
        if (totalPages > totalPageBlocks) {
            const startPage = Math.max(2, currentPage - siblingCount)
            const endPage = Math.min(totalPages - 1, currentPage + siblingCount)
            const pages: (number | string)[] = [1];

            if (startPage > 2) pages.push('...')

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }
            if (endPage < totalPages - 1) pages.push("...");

            pages.push(totalPages);
            return pages;
        }

        // لو عدد الصفحات قليل → اعرضهم كلهم
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const visiblePages = genetratePageNumbers();
    return (
        <div className="flex items-center justify-center mt-10 gap-2  [&>button]:transition-all [&>button]:cursor-pointer">
            {/* أول صفحة */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-400/30 disabled:opacity-40"
            >
                <ChevronsLeft />
            </button>

            {/* صفحة سابقة */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-400/30 disabled:opacity-40"
            >
                <ChevronLeft />
            </button>

            {/* أزرار الصفحات */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => {
                        if (typeof page === 'number') onPageChange(page)
                    }}
                    className={`px-4 py-2 rounded-md transition-colors ${page === currentPage
                        ? 'bg-primary text-white'
                        : 'bg-gray-400/30 text-black hover:bg-gray-300'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* صفحة بعدية */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-400/30 disabled:opacity-40"
            >
                <ChevronRight />
            </button>

            {/* آخر صفحة */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-400/30 disabled:opacity-40"
            >
                <ChevronsRight />
            </button>
        </div>
    );
};

export default Pagination;
