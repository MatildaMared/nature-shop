import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";

const onSubmitHandlerMock = jest.fn();

describe("LoginForm component", () => {
	it("renders without crashing", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);
	});

	it("displays the correct input elements", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);

		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();
		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("displays the correct error message", () => {
		const errorMessage = "Error message";

		render(
			<LoginForm
				submitHandler={onSubmitHandlerMock}
				errorMessage={errorMessage}
			/>
		);

		const error = screen.getByText(errorMessage);

		expect(error).toBeInTheDocument();
	});

	it("is not possible to click the button initially", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("is possible to click the button after filling in the form", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);

		const emailInput = screen.getByLabelText("Email");
		userEvent.type(emailInput, "test@test.com");

		const passwordInput = screen.getByLabelText("Password");
		userEvent.type(passwordInput, "test1234");

		const button = screen.getByRole("button");
		expect(button).toBeEnabled();
	});

	it("calls the submitHandler function with the correct information when the button is clicked", () => {
		render(<LoginForm submitHandler={onSubmitHandlerMock} errorMessage="" />);

		const email = "test@test.com";
		const password = "test1234";

		const emailInput = screen.getByLabelText("Email");
		userEvent.type(emailInput, email);

		const passwordInput = screen.getByLabelText("Password");
		userEvent.type(passwordInput, password);

		const button = screen.getByRole("button");
		userEvent.click(button);

		expect(onSubmitHandlerMock).toHaveBeenCalledTimes(1);
		expect(onSubmitHandlerMock).toHaveBeenCalledWith(email, password);
	});
});
