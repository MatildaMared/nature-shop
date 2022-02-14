import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

const updateContextMock = jest.fn();

const cartData = [
	{
		id: "1",
		posterId: "12",
		title: "Title",
		frame: "black",
		passerPartout: false,
		amount: 3,
		price: 199,
		inStock: 12,
	},
	{
		id: "7",
		posterId: "39",
		title: "Title",
		frame: "white",
		passerPartout: true,
		amount: 1,
		price: 249,
		inStock: 5,
	},
];

describe("Navbar component", () => {
	it("should render", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={[]}
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
					cart={[]}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const logo = screen.getByText(/WP/i);

		expect(logo).toBeInTheDocument();
	});

	it("displays a 'Posters' link that redirects user to /posters when clicked", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					cart={[]}
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
					cart={[]}
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
					cart={[]}
					isLoggedIn={true}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.queryByText(/Log in/i);

		expect(link).not.toBeInTheDocument();
	});

	it("displays a 'Sign up' link when user is not logged in", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					cart={[]}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</Router>
		);

		const link = screen.getByText(/Sign up/i);

		expect(link).toBeInTheDocument();

		userEvent.click(link);

		expect(history.location.pathname).toBe("/signup");
	});

	it("does not display a 'Sign up' link when user is logged in", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={[]}
					isLoggedIn={true}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.queryByText(/Sign up/i);

		expect(link).not.toBeInTheDocument();
	});

	it("displays a 'Logout' link when user is logged in", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={[]}
					isLoggedIn={true}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.getByText(/Log out/i);

		expect(link).toBeInTheDocument();
	});

	it("does not display a 'Logout' link when user is not logged in", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={[]}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.queryByText(/Log out/i);

		expect(link).not.toBeInTheDocument();
	});

	it("displays a 'Cart' link when user has items in the cart", () => {
		const history = createMemoryHistory();

		render(
			<Router location={history.location} navigator={history}>
				<Navbar
					cart={cartData}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</Router>
		);

		const link = screen.getByText(/Cart/i);

		expect(link).toBeInTheDocument();

		userEvent.click(link);

		expect(history.location.pathname).toBe("/cart");
	});

	it("does not display a 'Cart' link when cart is empty", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={[]}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const link = screen.queryByText(/Cart/i);

		expect(link).not.toBeInTheDocument();
	});

	it("displays the correct number of items in the cart", () => {
		render(
			<MemoryRouter>
				<Navbar
					cart={cartData}
					isLoggedIn={false}
					isAdmin={false}
					updateContext={updateContextMock}
				/>
			</MemoryRouter>
		);

		const cartAmount = screen.getByText(/4/i);

		expect(cartAmount).toBeInTheDocument();
	});
});
