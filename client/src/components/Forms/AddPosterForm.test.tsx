import { render, screen } from "@testing-library/react";
import AddPosterForm from "./AddPosterForm";

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
});
