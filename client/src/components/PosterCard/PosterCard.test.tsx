import { render, screen } from "@testing-library/react";
import PosterCard from "./PosterCard";

const dummyPoster = {
	id: "1",
	title: "Poster 1",
	description: "This is a description",
	imageUrl: "https://via.placeholder.com/300",
	price: 100,
	inStock: 10,
};

describe("PosterCard component", () => {
	it("renders properly", () => {
		render(<PosterCard poster={dummyPoster} />);
	});

	it("displays a title", () => {
		render(<PosterCard poster={dummyPoster} />);

		const title = screen.getByText(dummyPoster.title);

		expect(title).toBeInTheDocument();
	});

	it("displays an image", () => {
		render(<PosterCard poster={dummyPoster} />);

		const image = screen.getByAltText(dummyPoster.title);

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", dummyPoster.imageUrl);
	});

	it("displays a price", () => {
		render(<PosterCard poster={dummyPoster} />);

		const price = screen.getByText(`${dummyPoster.price}:-`);

		expect(price).toBeInTheDocument();
	});
});
