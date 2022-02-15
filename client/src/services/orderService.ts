import { CartItem } from "../models/Cart";

export async function placeOrder(
	order: { products: CartItem[] },
	token: string
) {
	const response = await fetch("/api/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(order),
	});
	const data = await response.json();
	return data;
}
