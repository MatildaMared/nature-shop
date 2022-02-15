import { render, screen } from "@testing-library/react";
import AddPosterForm from "./AddPosterForm";
import userEvent from "@testing-library/user-event";

const submitHandlerMock = jest.fn();

describe("AddPosterForm component", () => {
	it("renders without crashing", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);
	});

	it("displays all necessary input fields", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Image Url/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/In stock/i)).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("displays the correct error message", () => {
		const errorMessage = "Error message";

		render(
			<AddPosterForm
				errorMessage={errorMessage}
				submitHandler={submitHandlerMock}
			/>
		);

		const error = screen.getByText(errorMessage);

		expect(error).toBeInTheDocument();
	});

	it("is not possible to click the button initially", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
	});

	it("is possible to click the button after filling out all fields", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		const title = "Title";
		const category = "Category";
		const description = "Description";
		const imageUrl = "https://www.url.com";
		const price = "199";
		const inStock = "23";

		const titleInput = screen.getByLabelText(/Title/i);
		const categoryInput = screen.getByLabelText(/Category/i);
		const descriptionInput = screen.getByLabelText(/Description/i);
		const imageUrlInput = screen.getByLabelText(/Image Url/i);
		const priceInput = screen.getByLabelText(/Price/i);
		const inStockInput = screen.getByLabelText(/In stock/i);

		userEvent.type(titleInput, title);
		userEvent.type(categoryInput, category);
		userEvent.type(descriptionInput, description);
		userEvent.type(imageUrlInput, imageUrl);
		userEvent.type(priceInput, price);
		userEvent.type(inStockInput, inStock);

		const button = screen.getByRole("button");

		expect(button).not.toBeDisabled();
	});

	it("calls the submit handler when clicking the button", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		const title = "Title";
		const category = "Category";
		const description = "Description";
		const imageUrl = "https://www.url.com";
		const price = "199";
		const inStock = "23";

		const titleInput = screen.getByLabelText(/Title/i);
		const categoryInput = screen.getByLabelText(/Category/i);
		const descriptionInput = screen.getByLabelText(/Description/i);
		const imageUrlInput = screen.getByLabelText(/Image Url/i);
		const priceInput = screen.getByLabelText(/Price/i);
		const inStockInput = screen.getByLabelText(/In stock/i);

		userEvent.type(titleInput, title);
		userEvent.type(categoryInput, category);
		userEvent.type(descriptionInput, description);
		userEvent.type(imageUrlInput, imageUrl);
		userEvent.type(priceInput, price);
		userEvent.type(inStockInput, inStock);

		const button = screen.getByRole("button");

		userEvent.click(button);

		expect(submitHandlerMock).toHaveBeenCalledTimes(1);
		expect(submitHandlerMock).toHaveBeenCalledWith({
			title,
			category,
			description,
			imageUrl,
			price: Number(price),
			inStock: Number(inStock),
		});
	});
});
