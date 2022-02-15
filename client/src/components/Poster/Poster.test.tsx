import { render, screen } from "@testing-library/react";
import Poster from "./Poster";
import userEvent from "@testing-library/user-event";

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
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);
	});

	it("displays all correct information", () => {
		render(
			<Poster
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		expect(screen.getByText(dummyPoster.title)).toBeInTheDocument();
		expect(screen.getByText(dummyPoster.description)).toBeInTheDocument();
		expect(screen.getByText(dummyPoster.category)).toBeInTheDocument();
		expect(
			screen.getByText(`${dummyPoster.price.toString()}:-`)
		).toBeInTheDocument();
		expect(
			screen.getByText(dummyPoster.inStock.toString())
		).toBeInTheDocument();
	});

	it("displays an add to cart button", () => {
		render(
			<Poster
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();
	});

	it("does not display admin buttons when user is not an admin", () => {
		render(
			<Poster
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		expect(screen.queryByText(/Delete Poster/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Edit Poster/i)).not.toBeInTheDocument();
	});

	it("displays admin buttons when user is an admin", () => {
		render(
			<Poster
				isAdmin={true}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		expect(screen.getByText(/Delete Poster/i)).toBeInTheDocument();
		expect(screen.getByText(/Edit Poster/i)).toBeInTheDocument();
	});

	it("calls deletePosterHandler when delete poster button is clicked", () => {
		render(
			<Poster
				isAdmin={true}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		screen.getByText(/Delete Poster/i).click();
		expect(onDeletePosterMock).toHaveBeenCalledTimes(1);
		expect(onDeletePosterMock).toHaveBeenCalledWith(dummyPoster.id);
	});

	it("calls editPosterHandler when edit poster button is clicked", () => {
		render(
			<Poster
				isAdmin={true}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		screen.getByText(/Edit Poster/i).click();
		expect(onEditPosterMock).toHaveBeenCalledTimes(1);
		expect(onEditPosterMock).toHaveBeenCalledWith(dummyPoster.id);
	});

	it("updates the total price when user changes the amount", () => {
		render(
			<Poster
				isAdmin={false}
				poster={dummyPoster}
				deletePosterHandler={onDeletePosterMock}
				editPosterHandler={onEditPosterMock}
				addToCartHandler={onAddToCartMock}
			/>
		);

		const amountInput = screen.getByLabelText(/amount/i);
		userEvent.click(amountInput);
		userEvent.type(amountInput, "{selectall}{backspace}");
		userEvent.type(amountInput, "2");

		const newTotalPrice = dummyPoster.price * 2;
		expect(
			screen.getByText(`${newTotalPrice.toString()}:-`)
		).toBeInTheDocument();
	});
});
