import { render } from "@testing-library/react";
import Cart from "./Cart";
import { CartItem } from "../../models/Cart";

const cart: CartItem[] = [
	{
		id: "1",
		posterId: "12",
		title: "Green bliss",
		price: 100,
		amount: 1,
		frame: "black",
		passerPartout: false,
	},
	{
		id: "2",
		posterId: "3",
		title: "Monstera Heaven",
		price: 200,
		amount: 2,
		frame: "white",
		passerPartout: true,
	},
];

describe("Cart component", () => {
	it("renders without crashing", () => {
		render(<Cart cart={cart} />);
	});
});
