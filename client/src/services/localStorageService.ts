import { CartItem, NewCartItem } from "../models/Cart";
import { nanoid } from "nanoid";

export function saveToken(token: string) {
	localStorage.setItem("token", token);
}

export function getToken(): string | undefined {
	const item = localStorage.getItem("token");
	if (item) {
		return item;
	}
	return undefined;
}

export function getCart(): [] | undefined {
	const cart = localStorage.getItem("cart");
	if (cart) {
		return JSON.parse(cart);
	}
	return undefined;
}

export function addToCart(cartItem: NewCartItem): CartItem[] {
	const cartItemToAdd = {
		...cartItem,
		id: nanoid(),
	};

	const cart = getCart();

	if (cart && cart.length > 0) {
		const newCart = [...cart, cartItemToAdd];
		localStorage.setItem("cart", JSON.stringify(newCart));
		return newCart;
	} else {
		const newCart = [cartItemToAdd];
		localStorage.setItem("cart", JSON.stringify(newCart));
		return newCart;
	}
}

export function removeFromCart(id: string) {
	const cart: CartItem[] | undefined = getCart();
	if (cart && cart.length > 0) {
		const newCart = cart.filter((item) => item.id !== id);
		localStorage.setItem("cart", JSON.stringify(newCart));
		return newCart;
	}
	return [];
}

export function updateCart(id: string, updates: {}) {
	const cart: CartItem[] | undefined = getCart();

	if (cart && cart.length > 0) {
		const newCart = cart.map((item) => {
			if (item.id === id) {
				return {
					...item,
					...updates,
				};
			}
			return item;
		});
		localStorage.setItem("cart", JSON.stringify(newCart));
		return newCart;
	}

	return [];
}
