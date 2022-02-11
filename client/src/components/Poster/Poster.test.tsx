import { render } from "@testing-library/react";
import Poster from "./Poster";

const dummyPoster = {
	id: "1",
	title: "Poster Title",
	description: "Description",
	category: "category",
	imageUrl: "ImageUrl",
	price: 199,
	inStock: 50,
};

describe("Poster component", () => {
	it("renders without crashing", () => {
		render(<Poster poster={dummyPoster} />);
	});
});
