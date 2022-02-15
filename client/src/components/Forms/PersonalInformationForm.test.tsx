import { render, screen } from "@testing-library/react";
import PersonalInformationForm from "./PersonalInformationForm";
import { User } from "../../models/User";
import userEvent from "@testing-library/user-event";

const user: User = {
	id: "123",
	email: "test@test.com",
	role: "user",
	name: "Test User",
	address: {
		street: "Test Street",
		postalCode: "12345",
		city: "Test City",
	},
	orders: [],
};

const userChangeHandlerMock = jest.fn();

describe("PersonalInformationForm component", () => {
	it("renders without crashing", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);
	});

	it("displays the correct information initially", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);

		const name = screen.getByText(user.name);
		const street = screen.getByText(user.address.street);
		const postalCodeAndCity = screen.getByText(
			`${user.address.postalCode} ${user.address.city}`
		);

		expect(name).toBeInTheDocument();
		expect(street).toBeInTheDocument();
		expect(postalCodeAndCity).toBeInTheDocument();
	});

	it("displays no input fields initially", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);

		const nameInput = screen.queryByLabelText("Name");
		const streetInput = screen.queryByLabelText("Street");
		const postalCodeInput = screen.queryByLabelText("Postal Code");
		const cityInput = screen.queryByLabelText("City");

		expect(nameInput).not.toBeInTheDocument();
		expect(streetInput).not.toBeInTheDocument();
		expect(postalCodeInput).not.toBeInTheDocument();
		expect(cityInput).not.toBeInTheDocument();
	});

	it("displays a button initially", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("displays the correct input fields after clicking the button once", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);

		const button = screen.getByRole("button");
		userEvent.click(button);

		const nameInput = screen.getByLabelText("Name");
		const streetInput = screen.getByLabelText("Street");
		const postalCodeInput = screen.getByLabelText("Postal Code");
		const cityInput = screen.getByLabelText("City");

		expect(nameInput).toBeInTheDocument();
		expect(streetInput).toBeInTheDocument();
		expect(postalCodeInput).toBeInTheDocument();
		expect(cityInput).toBeInTheDocument();
	});

	it("calls the userChangeHandler with the correct information when clicking the button after editing", () => {
		render(
			<PersonalInformationForm
				user={user}
				userChangeHandler={userChangeHandlerMock}
			/>
		);

		const button = screen.getByRole("button");
		userEvent.click(button);

		const nameInput = screen.getByLabelText("Name");

		const newName = "New Name";

		userEvent.type(nameInput, "{selectall}{backspace}");
		userEvent.type(nameInput, newName);

		const saveButton = screen.getByRole("button");
		userEvent.click(saveButton);

		expect(userChangeHandlerMock).toHaveBeenCalledWith({
			name: newName,
			address: {
				street: user.address.street,
				postalCode: user.address.postalCode,
				city: user.address.city,
			},
		});
	});
});
