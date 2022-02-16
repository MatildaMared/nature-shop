import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EditPosterPage from "../EditPosterPage";

describe("EditPosterPage component", () => {
	it("renders without crashing", () => {
		render(
			<BrowserRouter>
				<EditPosterPage isAdmin={false} setPosters={jest.fn()} />
			</BrowserRouter>
		);
	});

	it("displays an error message if user is not an admin", () => {
		render(
			<BrowserRouter>
				<EditPosterPage isAdmin={false} setPosters={jest.fn()} />
			</BrowserRouter>
		);
		const errorMessage = screen.getByText(
			/You are not authorized to edit posters/i
		);
		expect(errorMessage).toBeInTheDocument();
	});

	it("displays the correct title", () => {
		render(
			<BrowserRouter>
				<EditPosterPage isAdmin={true} setPosters={jest.fn()} />
			</BrowserRouter>
		);
		const title = screen.getByRole("heading", { name: "Edit Poster" });
		expect(title).toBeInTheDocument();
	});
});
