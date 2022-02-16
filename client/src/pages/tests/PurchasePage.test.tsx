import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import PurchasePage from "../PurchasePage";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("PurchasePage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<PurchasePage />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<PurchasePage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const title = screen.getByText(/Purchase Summary/i);
		expect(title).toBeInTheDocument();
	});
});
