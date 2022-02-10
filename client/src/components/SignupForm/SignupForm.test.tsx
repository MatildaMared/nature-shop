import { render, screen } from "@testing-library/react";
import SignupForm from "./SignupForm";
import userEvent from "@testing-library/user-event";

const submitHandlerMock = jest.fn();

describe("SignupForm component", () => {
	it("renders without crashing", () => {
		render(<SignupForm errorMessage="" submitHandler={submitHandlerMock} />);
	});

	it("displays the correct input fields", () => {
		render(<SignupForm errorMessage="" submitHandler={submitHandlerMock} />);

		expect(screen.getByLabelText("Full name")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Password")).toBeInTheDocument();
		expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
		expect(screen.getByLabelText("Street")).toBeInTheDocument();
		expect(screen.getByLabelText("Postal code")).toBeInTheDocument();
		expect(screen.getByLabelText("City")).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<SignupForm errorMessage="" submitHandler={submitHandlerMock} />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("displays the correct error message", () => {
		render(
			<SignupForm
				errorMessage="Error message"
				submitHandler={submitHandlerMock}
			/>
		);

		const errorMessage = screen.getByText("Error message");

		expect(errorMessage).toBeInTheDocument();
	});

	it("is not possible to click the button when the fields are empty", () => {
		render(<SignupForm errorMessage="" submitHandler={submitHandlerMock} />);

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
	});

	it("calls the submit handler when are fields are filled correctly and button is clicked", () => {
		render(<SignupForm errorMessage="" submitHandler={submitHandlerMock} />);

		const testUser = {
			name: "Greta Garbo",
			email: "test@test.com",
			password: "password",
			address: {
				street: "Test street",
				postalCode: "123 45",
				city: "Test city",
			},
		};

		const nameInput = screen.getByLabelText("Full name");
		const emailInput = screen.getByLabelText("Email");
		const passwordInput = screen.getByLabelText("Password");
		const passwordConfirmInput = screen.getByLabelText("Confirm password");
		const streetInput = screen.getByLabelText("Street");
		const postalCodeInput = screen.getByLabelText("Postal code");
		const cityInput = screen.getByLabelText("City");

		userEvent.type(nameInput, testUser.name);
		userEvent.type(emailInput, testUser.email);
		userEvent.type(passwordInput, testUser.password);
		userEvent.type(passwordConfirmInput, testUser.password);
		userEvent.type(streetInput, testUser.address.street);
		userEvent.type(postalCodeInput, testUser.address.postalCode);
		userEvent.type(cityInput, testUser.address.city);

		const button = screen.getByRole("button");

		userEvent.click(button);

		expect(submitHandlerMock).toHaveBeenCalledTimes(1);
		expect(submitHandlerMock).toHaveBeenCalledWith(testUser);
	});
});
