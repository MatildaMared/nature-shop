export interface NewUser {
	name: string;
	email: string;
	password: string;
	address: {
		street: string;
		postalCode: string;
		city: string;
	};
}

export interface User {
	id: string;
	name: string;
	email: string;
	address: {
		street: string;
		postalCode: string;
		city: string;
	};
	orders: [];
	role: string;
}
