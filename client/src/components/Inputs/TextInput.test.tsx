import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "./TextInput";

const setValueMock = jest.fn();

describe("TextInput component", () => {
	it("renders properly", () => {
		render(
			<TextInput
				type="text"
				name="name"
				value="Greta"
				setValue={setValueMock}
				label="Name"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);
	});

	it("returns an input element", () => {
		render(
			<TextInput
				type="text"
				name="name"
				value="Sixten"
				setValue={setValueMock}
				label="Name"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const input = screen.getByLabelText("Name");
		expect(input).toBeInTheDocument();
	});

	it("displays a label text", () => {
		render(
			<TextInput
				type="text"
				name="name"
				value="Sixten"
				setValue={setValueMock}
				label="Label"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const label = screen.getByText("Label");
		expect(label).toBeInTheDocument();
	});

	it("returns the correct input element", () => {
		render(
			<TextInput
				type="password"
				name="password"
				value=""
				setValue={setValueMock}
				isValid={true}
				setIsValid={jest.fn()}
				label="Password"
			/>
		);

		const input = screen.getByLabelText("Password");
		expect(input).toHaveAttribute("type", "password");
	});

	it("calls the setValue function after entering text", () => {
		render(
			<TextInput
				type="text"
				name="name"
				value=""
				setValue={setValueMock}
				label="Name"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const input = screen.getByLabelText("Name");

		userEvent.type(input, "Lisa");

		expect(setValueMock).toHaveBeenCalledTimes(4);
		expect(setValueMock).toHaveBeenNthCalledWith(1, "L");
		expect(setValueMock).toHaveBeenNthCalledWith(3, "s");
	});

	it("displays an error message if validation fails", () => {
		const validateMock = jest.fn((string: string): [boolean, string] => [
			false,
			"Error message",
		]);

		render(
			<TextInput
				type="text"
				name="name"
				value=""
				setValue={setValueMock}
				label="Name"
				isValid={false}
				setIsValid={jest.fn()}
				validate={validateMock}
			/>
		);

		const input = screen.getByLabelText("Name");

		userEvent.type(input, "Lisa");
		input.blur();

		expect(screen.getByText("Error message")).toBeInTheDocument();
	});
});
