import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LoginPage from "../LoginPage";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("LoginPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const title = screen.getByText(/Login/i);
		expect(title).toBeInTheDocument();
	});

	it("displays two input fields and a button", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const emailInput = screen.getByLabelText(/Email/i);
		expect(emailInput).toBeInTheDocument();

		const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    
    const button = screen.getByRole("button", { name: "Log in" });
    expect(button).toBeInTheDocument();
  });
});
