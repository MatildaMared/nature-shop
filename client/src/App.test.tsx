import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { UserContext } from "./context/UserContext";

const context = {};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("App component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<App />
			</UserContext.Provider>
		);
	});

	it("renders the correct title initially", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<App />
			</UserContext.Provider>
		);
		expect(screen.getByText("Posters")).toBeInTheDocument();
	});
});
