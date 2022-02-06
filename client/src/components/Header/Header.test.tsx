import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
	it("should render", () => {
		render(<Header />);
	});

	it("displays the correct heading", () => {
		render(<Header />);

		const title = screen.getByText(/Wild Posters/i);

		expect(title).toBeInTheDocument();
	});

	it("displays the correct sub-heading", () => {
		render(<Header />);

		const subTitle = screen.getByText(/Bringing nature home/i);

		expect(subTitle).toBeInTheDocument();
	});
});
