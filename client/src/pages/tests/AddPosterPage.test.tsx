import { render, screen } from "@testing-library/react";
import AddPosterPage from "../AddPosterPage";
import { BrowserRouter } from "react-router-dom";

describe("AccountPage component", () => {
	it("renders without crashing", () => {
		render(
			<BrowserRouter>
				<AddPosterPage isAdmin={false} setPosters={jest.fn()} />
			</BrowserRouter>
		);
	});

	it("displays an error message if user is not an admin", () => {
		render(
			<BrowserRouter>
				<AddPosterPage isAdmin={false} setPosters={jest.fn()} />
			</BrowserRouter>
		);
		const errorMessage = screen.getByText(
			/You are not authorized to add posters/i
		);
		expect(errorMessage).toBeInTheDocument();
	});

	it("displays the correct title", () => {
		render(
			<BrowserRouter>
				<AddPosterPage isAdmin={true} setPosters={jest.fn()} />
			</BrowserRouter>
		);

		const title = screen.getByRole("heading", { name: "Add Poster" });
		expect(title).toBeInTheDocument();
	});

	it("displays a form", () => {
		render(
			<BrowserRouter>
				<AddPosterPage isAdmin={true} setPosters={jest.fn()} />
			</BrowserRouter>
		);

		const form = screen.queryAllByRole("textbox");
		expect(form.length).toBeGreaterThan(0);
	});
});
