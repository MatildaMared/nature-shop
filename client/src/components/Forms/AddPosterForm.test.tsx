import { render, screen } from "@testing-library/react";
import AddPosterForm from "./AddPosterForm";

const submitHandlerMock = jest.fn();

describe("AddPosterForm component", () => {
	it("renders without crashing", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);
	});

	it("displays all necessary input fields", () => {
		render(<AddPosterForm errorMessage="" submitHandler={submitHandlerMock} />);

		expect(screen.getByLabelText("Title")).toBeInTheDocument();
		expect(screen.getByLabelText("Category")).toBeInTheDocument();
		expect(screen.getByLabelText("Description")).toBeInTheDocument();
		expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
		expect(screen.getByLabelText("Price")).toBeInTheDocument();
		expect(screen.getByLabelText("Amount in stock")).toBeInTheDocument();
	});
});