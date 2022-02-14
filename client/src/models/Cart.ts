export interface NewCartItem {
	posterId: string;
	title: string;
	frame: string;
	passerPartout: boolean;
	amount: number;
	price: number;
	inStock: number;
}

export interface CartItem {
	id: string;
	posterId: string;
	title: string;
	frame: string;
	passerPartout: boolean;
	amount: number;
	price: number;
	inStock: number;
}
