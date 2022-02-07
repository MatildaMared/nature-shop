import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { UserContext } from "./context/UserContext";

const context = {
	name: "Matilda",
};

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
});
