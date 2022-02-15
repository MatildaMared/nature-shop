import { render, screen } from "@testing-library/react";
import PostersList from "./PostersList";

const onFavoriteClickMock = jest.fn();

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
	useNavigate: () => mockedNavigator,
}));

const posters = [
	{
		id: "1",
		title: "Poster 1",
		description: "This is a description",
		category: "category",
		imageUrl: "https://via.placeholder.com/300",
		price: 100,
		inStock: 10,
	},
	{
		id: "2",
		title: "Poster 2",
		description: "This is a description",
		category: "category",
		imageUrl: "https://via.placeholder.com/300",
		price: 400,
		inStock: 15,
	},
];

describe("PostersList component", () => {
	it("renders without crashing", () => {
		render(
			<PostersList
				posters={[]}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);
	});

	it("displays a message when there are no posters", () => {
		render(
			<PostersList
				posters={[]}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		expect(screen.getByText(/No posters found/i)).toBeInTheDocument();
	});

	it("displays the correct number of poster items", () => {
		render(
			<PostersList
				posters={posters}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		const posterItems = screen.getAllByRole("listitem");
		expect(posterItems.length).toBe(posters.length);
	});
});
