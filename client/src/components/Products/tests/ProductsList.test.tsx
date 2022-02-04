import { render, screen } from "@testing-library/react";
import ProductsList from "../ProductsList";

describe("ProductsList component", () => {
	it("renders without problems", () => {
		render(<ProductsList />);
	});

	it("displays a list of products", () => {
		render(<ProductsList />);
		const products = screen.getAllByRole("listitem");
		expect(products.length).toBe(3);
	});
});
