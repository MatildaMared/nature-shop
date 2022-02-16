import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import SignupPage from "../SignupPage";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("SignupPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<SignupPage />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<SignupPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const title = screen.getByRole("heading", { name: "Sign up" });
		expect(title).toBeInTheDocument();
	});

	it("displays a form", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<SignupPage />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const nameInput = screen.getByLabelText(/Name/i);
		expect(nameInput).toBeInTheDocument();

		const emailInput = screen.getByLabelText(/Email/i);
		expect(emailInput).toBeInTheDocument();

		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();

		const passwordConfirmInput = screen.getByLabelText("Confirm password");
		expect(passwordConfirmInput).toBeInTheDocument();

		const addressContainer = screen.getByText(/Address/i);
		expect(addressContainer).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Sign up" });
		expect(button).toBeInTheDocument();
	});
});
