import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

const onSubmitHandlerMock = jest.fn();

describe("LoginForm component", () => {
	it("renders properly", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} />);
	});

	it("displays the correct input elements", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} />);

		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();
		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
});
