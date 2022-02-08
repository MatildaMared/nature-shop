import { render } from "@testing-library/react";
import PostersList from "./PostersList";

describe("PostersList component", () => {
	it("should render", () => {
		render(<PostersList posters={null} />);
	});
});
