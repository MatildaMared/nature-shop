import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading component", () => {
	it("renders without crashing", () => {
		render(<Heading>Title</Heading>);
	});

	it("displays a heading element", () => {
		render(<Heading>Title</Heading>);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("displays the text provided", () => {
		const title = "Title";

		render(<Heading>{title}</Heading>);

		const heading = screen.getByText(title);

		expect(heading).toBeInTheDocument();
	});
});
