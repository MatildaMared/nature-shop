const dummyProducts = [
	{
		title: "Test product",
		description: "Test description",
		imageUrl: "https://test.com/test.jpg",
		price: 139,
		inStock: 15,
	},
	{
		title: "Test product 2",
		description: "Test description 2",
		imageUrl: "https://test.com/test2.jpg",
		price: 199,
		inStock: 53,
	},
	{
		title: "Test product 3",
		description: "Test description 3",
		imageUrl: "https://test.com/test3.jpg",
		price: 99,
		inStock: 35,
	},
];

const dummyProduct = {
	title: "Test product",
	description: "Test description",
	imageUrl: "https://test.com/test.jpg",
	price: 139,
	inStock: 15,
};

dummyUser = {
	name: "Test user",
	email: "test@test.com",
	password: "test123",
	address: {
		street: "Street 1",
		city: "City",
		postalCode: "12345",
	},
};

module.exports = { dummyProduct, dummyProducts, dummyUser };
