import { render, screen } from "@testing-library/react";
import EditPosterForm from "./EditPosterForm";
import { Poster } from "../../models/Poster";
import userEvent from "@testing-library/user-event";

const submitHandlerMock = jest.fn();

const poster: Poster = {
	id: "1",
	title: "Title",
	category: "Category",
	description: "Description",
	imageUrl: "https://www.url.com",
	price: 199,
	inStock: 23,
};

describe("EditPosterForm component", () => {
	it("renders without crashing", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);
	});

	it("displays the correct input fields", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);

		expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Image Url/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/In stock/i)).toBeInTheDocument();
	});

	it("displays a button", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("displays the correct error message", () => {
		const errorMessage = "Error message";

		render(
			<EditPosterForm
				poster={poster}
				errorMessage={errorMessage}
				submitHandler={submitHandlerMock}
			/>
		);

		const error = screen.getByText(errorMessage);

		expect(error).toBeInTheDocument();
	});

	it("is possible to click the button initially", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);

		const button = screen.getByRole("button");

		expect(button).toBeEnabled();
	});

	it("is not possible to click the button if you enter incorrect information in one of the input fields", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);

		const titleInput = screen.getByLabelText(/Title/i);

		userEvent.type(titleInput, "{selectall}{backspace}");
		userEvent.type(titleInput, "a");

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
	});

	it("calls the submitHandler with correct information after pressing the button", () => {
		render(
			<EditPosterForm
				poster={poster}
				errorMessage=""
				submitHandler={submitHandlerMock}
			/>
		);

		const button = screen.getByRole("button");

		userEvent.click(button);

		expect(submitHandlerMock).toHaveBeenCalledWith({
			title: poster.title,
			category: poster.category,
			description: poster.description,
			imageUrl: poster.imageUrl,
			price: poster.price,
			inStock: poster.inStock,
		});
	});
});
