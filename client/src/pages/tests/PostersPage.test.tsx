import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import PostersPage from "../PostersPage";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("LoginPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<PostersPage posters={[]} />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<PostersPage posters={[]} />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const title = screen.getByText(/Our Posters/i);
		expect(title).toBeInTheDocument();
	});

	it("displays the different sections to filter posters", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<PostersPage posters={[]} />
				</BrowserRouter>
			</UserContext.Provider>
		);

		const categoriesContainer = screen.getByText(/Categories/i);
		expect(categoriesContainer).toBeInTheDocument();

		const titleSearch = screen.getByText(/Search by title/i);
		expect(titleSearch).toBeInTheDocument();

		const favoritesContainer = screen.getByText("Favorites");
		expect(favoritesContainer).toBeInTheDocument();
	});
});
