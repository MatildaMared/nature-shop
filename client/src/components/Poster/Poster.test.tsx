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

const onDeletePosterMock = jest.fn();
const onEditPosterMock = jest.fn();
const onAddToCartMock = jest.fn();

describe("Poster component", () => {
	it("renders without crashing", () => {
		render(
			<Poster
				isLoggedIn={true}
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);
	});
});
