export interface Poster {
	id: string;
	title: string;
	description: string;
	category?: string;
	imageUrl: string;
	price: number;
	inStock: number;
}

export interface NewPoster {
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	price: number;
	inStock: number;
}
