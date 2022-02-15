import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
	it("should render", () => {
		render(<Footer />);
	});

	it("displays the correct text", () => {
		render(<Footer />);

		const text = "© Matilda Mared 2022";

		const copy = screen.getByText(text);

		expect(copy).toBeInTheDocument();
	});

	it("displays the correct number of links", () => {
		render(<Footer />);

		const links = screen.getAllByRole("link");

		expect(links.length).toBe(3);
	});

	it("displays the correct links", () => {
		render(<Footer />);

		const links = screen.getAllByRole("link");

		expect(links[0].textContent).toBe("GitHub");
		expect(links[1].textContent).toBe("Mail");
		expect(links[2].textContent).toBe("LinkedIn");
	});
});
