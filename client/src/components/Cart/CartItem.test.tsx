import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../../models/Cart";
import userEvent from "@testing-library/user-event";

const item: CartItemType = {
	id: "1",
	posterId: "12",
	title: "Title",
	frame: "black",
	passerPartout: false,
	amount: 3,
	price: 199,
	inStock: 12,
};

const removeFromCartHandlerMock = jest.fn();
const updateItemInCartHandlerMock = jest.fn();

describe("CartItem component", () => {
	it("renders without crashing", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);
	});

	it("displays the correct title", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		expect(screen.getByText(item.title)).toBeInTheDocument();
	});

	it("displays the correct information about the cart item", () => {
		const informationString = `${item.frame} frame, no passerpartout, ${item.amount}x`;
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		expect(screen.getByText(informationString)).toBeInTheDocument();
	});

	it("does not display the editing part initially", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		expect(screen.queryByText(/Editing/i)).not.toBeInTheDocument();
	});

	it("displays the editing part when the edit button is clicked", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		userEvent.click(screen.getByText(/Edit/i));

		expect(screen.getByText(/Editing/i)).toBeInTheDocument();
	});

	it("does not display the editing part after clicking the edit button twice", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		const editButton = screen.getByText(/Edit/i);
		userEvent.click(editButton);
		userEvent.click(editButton);

		expect(screen.queryByText(/Editing/i)).not.toBeInTheDocument();
	});

	it("displays the correct amount of inputs", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		userEvent.click(screen.getByText(/Edit/i));

		expect(screen.getAllByRole("radio").length).toBe(4);
		expect(screen.getAllByRole("spinbutton").length).toBe(1);
	});

	it("updates the cart item when user clicks save changes after editing", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		userEvent.click(screen.getByText(/Edit/i));

		const frameWhiteRadio = screen.getByLabelText(/White/i);
		userEvent.click(frameWhiteRadio);

		const passerPartoutRadio = screen.getByLabelText(/Yes/i);
		userEvent.click(passerPartoutRadio);

		userEvent.click(screen.getByText(/Save changes/i));

		const updatesObject = {
			frame: "white",
			amount: item.amount,
			passerPartout: true,
		};

		expect(updateItemInCartHandlerMock).toHaveBeenCalledWith(
			item.id,
			updatesObject
		);
	});

	it("closes the editing part after user clicks on save changes", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		const editButton = screen.getByText(/Edit/i);
		userEvent.click(editButton);

		const saveChangesButton = screen.getByText(/Save changes/i);
		userEvent.click(saveChangesButton);

		expect(screen.queryByText(/Editing/i)).not.toBeInTheDocument();
	});

	it("calls the remove handler when user clicks the remove button", () => {
		render(
			<CartItem
				item={item}
				removeFromCartHandler={removeFromCartHandlerMock}
				updateItemInCartHandler={updateItemInCartHandlerMock}
			/>
		);

		const removeButton = screen.getByText(/Remove/i);

		userEvent.click(removeButton);

		expect(removeFromCartHandlerMock).toHaveBeenCalledWith(item.id);
	});
});
