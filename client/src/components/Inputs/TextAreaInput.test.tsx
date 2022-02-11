import { render, screen } from "@testing-library/react";
import TextAreaInput from "./TextAreaInput";
import userEvent from "@testing-library/user-event";

const setValueMock = jest.fn();

describe("TextAreaInput component", () => {
	it("renders without crashing", () => {
		render(
			<TextAreaInput
				name="description"
				value="Description"
				setValue={setValueMock}
				label="Description"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);
	});

	it("returns a textarea element", () => {
		render(
			<TextAreaInput
				name="description"
				value="This is a description"
				setValue={setValueMock}
				label="Description"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const textarea = screen.getByLabelText("Description");
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("rows", "3");
	});

	it("displays a label text", () => {
		render(
			<TextAreaInput
				name="description"
				value="This is a description"
				setValue={setValueMock}
				label="Description"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const label = screen.getByText("Description");
		expect(label).toBeInTheDocument();
	});

	it("displays an error message if validation fails", () => {
		const validateMock = jest.fn((string: string): [boolean, string] => [
			false,
			"Error message",
		]);

		render(
			<TextAreaInput
				name="description"
				value="This is a description"
				setValue={setValueMock}
				label="Description"
				isValid={false}
				setIsValid={jest.fn()}
				validate={validateMock}
			/>
		);

		const input = screen.getByLabelText("Description");

		userEvent.type(input, "Text");
		input.blur();

		const errorMessage = screen.getByText("Error message");
		expect(errorMessage).toBeInTheDocument();
	});

	it("calls the setValue function after entering text", () => {
		render(
			<TextAreaInput
				name="description"
				value=""
				setValue={setValueMock}
				label="Description"
				isValid={true}
				setIsValid={jest.fn()}
			/>
		);

		const input = screen.getByLabelText("Description");

		userEvent.type(input, "B");

		expect(setValueMock).toHaveBeenCalledWith("B");
	});
});
