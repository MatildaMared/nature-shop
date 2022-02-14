import { render, screen } from "@testing-library/react";
import PosterCard from "./PosterCard";
import userEvent from "@testing-library/user-event";

// Mocks for react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
	useNavigate: () => mockedNavigator,
}));

const onFavoriteClickMock = jest.fn();

// Dummy data
const dummyPoster = {
	id: "1",
	title: "Poster 1",
	description: "This is a description",
	category: "category",
	imageUrl: "https://via.placeholder.com/300",
	price: 100,
	inStock: 10,
};

// Actual tests
describe("PosterCard component", () => {
	it("renders properly", () => {
		render(
			<PosterCard poster={dummyPoster} onFavoriteClick={onFavoriteClickMock} favorites={[]} />
		);
	});

	it("displays a title", () => {
		render(
			<PosterCard
				poster={dummyPoster}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		const title = screen.getByText(dummyPoster.title);

		expect(title).toBeInTheDocument();
	});

	it("displays an image", () => {
		render(
			<PosterCard
				poster={dummyPoster}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		const image = screen.getByAltText(dummyPoster.title);

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", dummyPoster.imageUrl);
	});

	it("displays a price", () => {
		render(
			<PosterCard
				poster={dummyPoster}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		const price = screen.getByText(`${dummyPoster.price}:-`);

		expect(price).toBeInTheDocument();
	});

	it("redirects user to the correct page if clicking the card", () => {
		render(
			<PosterCard
				poster={dummyPoster}
				onFavoriteClick={onFavoriteClickMock}
				favorites={[]}
			/>
		);

		const card = screen.getByTestId("poster-card");

		userEvent.click(card);

		expect(mockedNavigator).toHaveBeenCalledWith(`/posters/${dummyPoster.id}`);
	});
});
