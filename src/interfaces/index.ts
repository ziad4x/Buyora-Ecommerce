export interface Product {
    id: number;
    title: string;
    price: number;
    image?: string;
    quantity?: number;
    description?: string;
    category?: string;
    rating?: number;
    discountPercentage?: number;
    thumbnail?: string;
    images?: string[];
    stock?: number;
    review?: string;
    reviews?: [{
        review: string;
        rating: number;
        reviewerName: string;
        reviewerEmail: string;
        comment: string;
        date: string;
    }];
}

