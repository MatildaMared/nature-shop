import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

const onLoginHandlerMock = jest.fn();

describe("LoginForm component", () => {
	it("renders properly", () => {
		render(<LoginForm onSubmit={onLoginHandlerMock} />);
	});

	it("displays the correct input elements", () => {
		render(<LoginForm onSubmit={onLoginHandlerMock} />);

		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();
		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<LoginForm onSubmit={onLoginHandlerMock} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
});
