import { render, screen } from "@testing-library/react";
import AccountPage from "./AccountPage";
import { UserContext } from "../context/UserContext";

const context = {};

const contextWithData = {
	isLoggedIn: true,
	isLoading: false,
	isAdmin: false,
	user: {
		id: "123",
		name: "John Doe",
		email: "user@user.com",
		address: {
			street: "Street 3",
			city: "Anytown",
			postalCody: "123 45",
		},
	},
};

const updateContext = jest.fn();

const dummyContext = [context, updateContext];

describe("AccountPage component", () => {
	it("renders without crashing", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<AccountPage />
			</UserContext.Provider>
		);
	});

	it("displays the correct title", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<AccountPage />
			</UserContext.Provider>
		);

		const title = screen.getByText(/Account/i);
		expect(title).toBeInTheDocument();
	});

	it("displays a text if the user is not logged in", () => {
		render(
			<UserContext.Provider value={dummyContext}>
				<AccountPage />
			</UserContext.Provider>
		);

		const text = screen.getByText(/You need to be logged in/i);
		expect(text).toBeInTheDocument();
	});

	it("displays the personal information section", () => {
		const dummyContext = [contextWithData, updateContext];

		render(
			<UserContext.Provider value={dummyContext}>
				<AccountPage />
			</UserContext.Provider>
		);

		const personalInfo = screen.getByText(/Personal Information/i);
		expect(personalInfo).toBeInTheDocument();
	});

	it("displays the order history section", () => {
		const dummyContext = [contextWithData, updateContext];

		render(
			<UserContext.Provider value={dummyContext}>
				<AccountPage />
			</UserContext.Provider>
		);

		const orderHistory = screen.getByText(/Order History/i);
		expect(orderHistory).toBeInTheDocument();
	});
});
