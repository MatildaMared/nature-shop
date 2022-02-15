import { render, screen } from "@testing-library/react";
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
		inStock: 10,
	},
	{
		id: "2",
		posterId: "3",
		title: "Monstera Heaven",
		price: 200,
		amount: 2,
		frame: "white",
		passerPartout: true,
		inStock: 5,
	},
];

const removeFromCartHandlerMock = jest.fn();
const updateItemInCartHandlerMock = jest.fn();

describe("Cart component", () => {
	it("renders without crashing", () => {
		render(
			<Cart
				updateItemInCartHandler={updateItemInCartHandlerMock}
				removeFromCartHandler={removeFromCartHandlerMock}
				cart={cart}
			/>
		);
	});

	it("renders the correct amount of list items", () => {
		render(
			<Cart
				updateItemInCartHandler={updateItemInCartHandlerMock}
				removeFromCartHandler={removeFromCartHandlerMock}
				cart={cart}
			/>
		);

		const cartItems = screen.getAllByRole("listitem");
		expect(cartItems.length).toBe(cart.length);
	});

	it("displays the correct total price", () => {
		render(
			<Cart
				updateItemInCartHandler={updateItemInCartHandlerMock}
				removeFromCartHandler={removeFromCartHandlerMock}
				cart={cart}
			/>
		);

		const totalPrice = cart.reduce(
			(acc, cur) => acc + cur.price * cur.amount,
			0
		);

		const totalPriceElem = screen.getByText(`${totalPrice}:-`);
		expect(totalPriceElem).toBeInTheDocument();
	});
});
