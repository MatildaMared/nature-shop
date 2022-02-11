import { render, screen } from "@testing-library/react";
import NumberInput from "./NumberInput";
import userEvent from "@testing-library/user-event";

const setValueMock = jest.fn();
const setIsValidMock = jest.fn();

describe("NumberInput component", () => {
	it("renders without crashing", () => {
		render(
			<NumberInput
				value={0}
				name="price"
				isValid={true}
				setValue={setValueMock}
				label="Price"
				setIsValid={setIsValidMock}
				min="0"
				max="100"
			/>
		);
	});

	it("displays a label text", () => {
		render(
			<NumberInput
				value={0}
				name="price"
				isValid={true}
				setValue={setValueMock}
				label="Label"
				setIsValid={setIsValidMock}
				min="0"
				max="100"
			/>
		);

		expect(screen.getByLabelText("Label")).toBeInTheDocument();
	});

	it("displays a number input field", () => {
		render(
			<NumberInput
				value={0}
				name="price"
				isValid={true}
				setValue={setValueMock}
				label="Price"
				setIsValid={setIsValidMock}
				min="0"
				max="100"
			/>
		);

		const input = screen.getByLabelText("Price");

		expect(input).toHaveAttribute("type", "number");
	});

	it("displays an error message when the input is invalid", () => {
		const errorMessage = "Error message";

		const validatorMock = jest.fn((number: number): [boolean, string] => [
			false,
			errorMessage,
		]);

		render(
			<NumberInput
				value={0}
				name="price"
				isValid={false}
				setValue={setValueMock}
				label="Price"
				setIsValid={setIsValidMock}
				min="0"
				max="100"
				validate={validatorMock}
			/>
		);

		const input = screen.getByLabelText("Price");
		userEvent.type(input, "1");
		input.blur();

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});
});
