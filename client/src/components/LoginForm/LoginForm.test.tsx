import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
	it("renders properly", () => {
		render(<LoginForm />);
	});

	it("displays the correct input elements", () => {
		render(<LoginForm />);

		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();
		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<LoginForm />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
});
