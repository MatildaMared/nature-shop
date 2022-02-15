import { render, screen } from "@testing-library/react";
import OrderHistory from "./OrderHistory";

const orders = [
	{
		id: "123",
		createdAt: new Date(20200101),
		totalPrice: 199,
	},
	{
		id: "456",
		createdAt: new Date(20220231),
		totalPrice: 299,
	},
];

describe("OrderHistory component", () => {
	it("renders without crashing", () => {
		render(<OrderHistory orders={orders} />);
	});

	it("renders the correct number of orders", () => {
		render(<OrderHistory orders={orders} />);

		const orderItems = screen.queryAllByRole("listitem");
		expect(orderItems.length).toBe(orders.length);
	});

	it("renders the correct order details", () => {
		render(<OrderHistory orders={orders} />);

		const orderTitle = screen.getByText(orders[0].id);
		const orderDates = screen.queryAllByText(/Order placed at/i);
		const orderPrice = screen.getByText(
			`Total price: ${orders[0].totalPrice}:-`
		);

		expect(orderTitle).toBeInTheDocument();
		expect(orderDates[0]).toBeInTheDocument();
		expect(orderPrice).toBeInTheDocument();
	});
});
