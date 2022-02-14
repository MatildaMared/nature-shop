import { render, screen } from "@testing-library/react";
import Button from "./Button";

const onClickMock = jest.fn();

describe("Button component", () => {
	it("renders properly", () => {
		render(
			<Button type="button" onClick={onClickMock}>
				Button
			</Button>
		);
	});

	it("displays a button", () => {
		render(
			<Button type="button" onClick={onClickMock}>
				Button
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("displays the correct button text", () => {
		render(
			<Button type="button" onClick={onClickMock}>
				CorrectText
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("CorrectText");
	});

	it("displays the correct type of button", () => {
		render(
			<Button type="submit" onClick={onClickMock}>
				Button
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("type", "submit");
	});

	it("calls the onClick handler when clicked", () => {
		render(
			<Button type="button" onClick={onClickMock}>
				Button
			</Button>
		);

		const button = screen.getByRole("button");
		button.click();
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});
