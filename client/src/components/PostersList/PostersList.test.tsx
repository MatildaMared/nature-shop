import { render } from "@testing-library/react";
import PostersList from "./PostersList";

const onFavoriteClickMock = jest.fn();

describe("PostersList component", () => {
	it("should render", () => {
		render(
			<PostersList posters={null} onFavoriteClick={onFavoriteClickMock} favorites={[]} />
		);
	});
});
