import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import SinglePosterPage from "../SinglePosterPage";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("SinglePosterPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<BrowserRouter>
					<SinglePosterPage setPosters={jest.fn()} />
				</BrowserRouter>
			</UserContext.Provider>
		);
	});
});
