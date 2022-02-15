import { render, screen } from "@testing-library/react";
import CartOverview from "./CartOverview";
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

describe("CartOverview component", () => {
	it("renders without crashing", () => {
		render(<CartOverview cart={cart} />);
	});

	it("renders the correct amount of items", () => {
		render(<CartOverview cart={cart} />);

		const items = screen.queryAllByRole("listitem");
		expect(items.length).toBe(cart.length);
	});

	it("displays the title of each cart item", () => {
		render(<CartOverview cart={cart} />);

		const title1 = screen.getByText(cart[0].title);
		const title2 = screen.getByText(cart[1].title);

		expect(title1).toBeInTheDocument();
		expect(title2).toBeInTheDocument();
	});

	it("displays the correct total price", () => {
		const totalPrice = cart.reduce(
			(acc, curr) => acc + curr.price * curr.amount,
			0
		);

		render(<CartOverview cart={cart} />);

		const totalPriceElement = screen.getByText(`Total price: ${totalPrice}:-`);

		expect(totalPriceElement).toBeInTheDocument();
	});
});
