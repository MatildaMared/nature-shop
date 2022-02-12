export interface NewCart {
	posterId: string;
	title: string;
	frame: "black" | "white";
	passerPartout: boolean;
	amount: number;
	price: number;
	totalPrice: number;
}

export interface Cart {
	id: string;
	posterId: string;
	title: string;
	frame: "black" | "white";
	passerPartout: boolean;
	amount: number;
	price: number;
	totalPrice: number;
}
