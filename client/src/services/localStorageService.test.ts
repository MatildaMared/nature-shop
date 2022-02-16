import {
	getToken,
	saveToken,
	addToCart,
	getCart,
	removeFromCart,
	updateCart,
	addToFavorites,
	getFavorites,
	removeFromFavorites,
} from "./localStorageService";
import { NewCartItem } from "../models/Cart";

const cartItem: NewCartItem = {
	title: "Title",
	price: 100,
	amount: 1,
	posterId: "123",
	passerPartout: false,
	frame: "white",
	inStock: 20,
};

describe("Local Storage service functions", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe("getToken function", () => {
		it("returns token if it exists", () => {
			const token = "test";
			localStorage.setItem("token", token);
			expect(getToken()).toEqual(token);
		});

		it("returns undefined if token does not exist", () => {
			expect(getToken()).toEqual(undefined);
		});
	});

	describe("saveToken function", () => {
		it("saves token in localStorage", () => {
			const token = "pancake";
			saveToken(token);
			expect(localStorage.getItem("token")).toEqual(token);
		});
	});

	describe("addToCart function", () => {
		it("creates a new cart and add the item to it, if there is none already", () => {
			addToCart(cartItem);

			const cartFromStorage = localStorage.getItem("cart");
			let realCart;
			if (cartFromStorage) {
				realCart = JSON.parse(cartFromStorage);
			}

			expect(realCart[0].title).toBe(cartItem.title);
			expect(realCart.length).toBe(1);
		});

		it("adds the item to the existing cart if there is one", () => {
			const cartItem2: NewCartItem = {
				title: "Another title",
				price: 300,
				amount: 2,
				posterId: "123",
				passerPartout: false,
				frame: "white",
				inStock: 20,
			};

			addToCart(cartItem);
			addToCart(cartItem2);

			const cartFromStorage = localStorage.getItem("cart");
			let realCart;
			if (cartFromStorage) {
				realCart = JSON.parse(cartFromStorage);
			}

			expect(realCart[0].title).toBe(cartItem.title);
			expect(realCart[1].title).toBe(cartItem2.title);
			expect(realCart.length).toBe(2);
		});

		it("adds a unique id to each cart item", () => {
			addToCart(cartItem);

			const cartFromStorage = localStorage.getItem("cart");
			let realCart;
			if (cartFromStorage) {
				realCart = JSON.parse(cartFromStorage);
			}

			expect(realCart[0].id).toBeDefined();
		});
	});

	describe("getCart function", () => {
		it("returns the cart", () => {
			const cart = [cartItem];
			localStorage.setItem("cart", JSON.stringify(cart));

			const actualCart = getCart();
			expect(actualCart).toEqual(cart);
		});

		it("returns undefined if there is no cart", () => {
			const actualCart = getCart();
			expect(actualCart).toEqual(undefined);
		});
	});

	describe("removeFromCart function", () => {
		it("removes the item from the cart", () => {
			const cart = addToCart(cartItem);
			const idToRemove = cart[0].id;
			removeFromCart(idToRemove);

			let cartFromStorage = localStorage.getItem("cart");
			expect(cartFromStorage).toEqual("[]");
		});

		it("does not remove anything if the id does not match", () => {
			addToCart(cartItem);
			const idToRemove = "wrong";

			removeFromCart(idToRemove);

			const cartFromStorage = localStorage.getItem("cart");
			let actualCart;
			if (cartFromStorage) {
				actualCart = JSON.parse(cartFromStorage);
			}
			expect(actualCart.length).toBe(1);
		});
	});

	describe("updateCart function", () => {
		it("updates the cart", () => {
			const cart = addToCart(cartItem);
			const idToUpdate = cart[0].id;

			const updates = {
				title: "Updated",
			};
			updateCart(idToUpdate, updates);

			const cartFromStorage = localStorage.getItem("cart");
			let actualCart;
			if (cartFromStorage) {
				actualCart = JSON.parse(cartFromStorage);
			}

			expect(actualCart[0].title).toBe(updates.title);
		});

		it("does not update anything if the id does not match", () => {
			addToCart(cartItem);
			const idToUpdate = "wrong";

			const updates = {
				title: "Updated",
			};
			updateCart(idToUpdate, updates);

			const cartFromStorage = localStorage.getItem("cart");
			let actualCart;
			if (cartFromStorage) {
				actualCart = JSON.parse(cartFromStorage);
			}

			expect(actualCart[0].title).toBe(cartItem.title);
		});
	});

	describe("addToFavorites function", () => {
		it("adds the item to the favorites", () => {
			const favorite = "123";

			const favorites = addToFavorites(favorite);

			expect(favorites[0]).toBe(favorite);

			const favoritesFromStorage = localStorage.getItem("favorites");
			let actualFavorites;
			if (favoritesFromStorage) {
				actualFavorites = JSON.parse(favoritesFromStorage);
			}

			expect(actualFavorites[0]).toBe(favorite);
		});
	});

	describe("getFavorites function", () => {
		it("returns the favorites", () => {
			const favorite = "123";
			const anotherFavorite = "78d";
			localStorage.setItem(
				"favorites",
				JSON.stringify([favorite, anotherFavorite])
			);

			const actualFavorites = getFavorites();
			expect(actualFavorites).toEqual([favorite, anotherFavorite]);
		});

		it("returns undefined if there is no favorites", () => {
			const actualFavorites = getFavorites();
			expect(actualFavorites).toEqual(undefined);
		});
	});

	describe("removeFromFavorites function", () => {
		it("removes the item from the favorites", () => {
			const favorite = "54r";
			const anotherFavorite = "df7";
			localStorage.setItem(
				"favorites",
				JSON.stringify([favorite, anotherFavorite])
			);

			const favorites = removeFromFavorites(favorite);

			expect(favorites[0]).toBe(anotherFavorite);

			const favoritesFromStorage = localStorage.getItem("favorites");
			let actualFavorites;
			if (favoritesFromStorage) {
				actualFavorites = JSON.parse(favoritesFromStorage);
			}

			expect(actualFavorites[0]).toBe(anotherFavorite);
		});

		it("does not remove anything if the id does not match", () => {
			addToFavorites("78d");
			const idToRemove = "wrongId";

			removeFromFavorites(idToRemove);

			const favoritesFromStorage = localStorage.getItem("favorites");
			let actualFavorites;
			if (favoritesFromStorage) {
				actualFavorites = JSON.parse(favoritesFromStorage);
			}
			expect(actualFavorites.length).toBe(1);
		});
	});
});
