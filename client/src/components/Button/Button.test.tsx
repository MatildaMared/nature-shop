import { render } from "@testing-library/react";
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
});
