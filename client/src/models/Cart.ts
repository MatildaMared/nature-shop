export interface NewCartItem {
	posterId: string;
	title: string;
	frame: "black" | "white";
	passerPartout: boolean;
	amount: number;
	price: number;
}

export interface CartItem {
	id: string;
	posterId: string;
	title: string;
	frame: "black" | "white";
	passerPartout: boolean;
	amount: number;
	price: number;
}
