import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

const updateContextMock = jest.fn();

describe("Navbar component", () => {
	it("should render", () => {
		render(
			<MemoryRouter>
				<Navbar
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);
	});

	it("displays a decorative logo", () => {
		render(
			<MemoryRouter>
				<Navbar
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const logo = screen.getByText(/WP/i);

		expect(logo).toBeInTheDocument();
	});

	it("displays a 'Home' link that redirects user to / when clicked", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</Router>
		);

		const link = screen.getByText(/Home/i);

		userEvent.click(link);

		expect(history.location.pathname).toBe("/");
	});

	it("displays a 'Posters' link that redirects user to /posters when clicked", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</Router>
		);

		const link = screen.getByText(/Posters/i);

		expect(link).toBeInTheDocument();

		userEvent.click(link);

		expect(history.location.pathname).toBe("/posters");
	});

	it("displays a 'Login' link when user is not logged in", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</Router>
		);

		const link = screen.getByText(/Log in/i);

		expect(link).toBeInTheDocument();

		userEvent.click(link);

		expect(history.location.pathname).toBe("/login");
	});

	it("does not display a 'Login' link when user is logged in", () => {
		render(
			<MemoryRouter>
				<Navbar
					isLoggedIn={true}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.queryByText(/Log in/i);

		expect(link).not.toBeInTheDocument();
	});
});
