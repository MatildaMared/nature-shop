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
			/>
		);

		const input = screen.getByLabelText("Name");
		expect(input).toBeInTheDocument();
	});

	it("returns the correct input element", () => {
		render(
			<TextInput
				type="password"
				name="password"
				value=""
				setValue={setValueMock}
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
			/>
		);

		const input = screen.getByLabelText("Name");

		userEvent.type(input, "Lisa");

		expect(setValueMock).toHaveBeenCalledTimes(4);
		expect(setValueMock).toHaveBeenNthCalledWith(1, "L");
		expect(setValueMock).toHaveBeenNthCalledWith(3, "s");
	});
});
