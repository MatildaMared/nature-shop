import { render, screen } from "@testing-library/react";
import UserAddress from "./UserAddress";

const address = {
	street: "Super Street 12",
	postalCode: "123 45",
	city: "City",
};

const name = "Anna Karlsson";

describe("UserAddress component", () => {
	it("renders without crashing", () => {
		render(<UserAddress address={address} name={name} />);
	});

	it("renders the correct address", () => {
		render(<UserAddress address={address} name={name} />);

		const streetElem = screen.getByText(address.street);
		const postalCodeAndCityElem = screen.getByText(
			`${address.postalCode} ${address.city}`
		);

		expect(streetElem).toBeInTheDocument();
		expect(postalCodeAndCityElem).toBeInTheDocument();
	});

	it("renders the correct name", () => {
		render(<UserAddress address={address} name={name} />);

		const nameElem = screen.getByText(name);

		expect(nameElem).toBeInTheDocument();
	});
});
