import { render, screen } from "@testing-library/react";
import CartPage from "../CartPage";
import { UserContext } from "../../context/UserContext";
import { BrowserRouter } from "react-router-dom";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("CartPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<CartPage />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<CartPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const title = screen.getByText(/Cart/i);
		expect(title).toBeInTheDocument();
	});

	it("displays a proceed to purchase button", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<CartPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const button = screen.getByRole("button", { name: "Proceed to purchase" });
		expect(button).toBeInTheDocument();
	});
});
