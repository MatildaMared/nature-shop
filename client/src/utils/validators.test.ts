import {
	emailValidator,
	nameValidator,
	postalCodeValidator,
	cityValidator,
	streetValidator,
	passwordValidator,
	passwordConfirmValidator,
	posterTitleValidator,
	posterCategoryValidator,
	posterDescriptionValidator,
	posterImageUrlValidator,
	posterInStockValidator,
	posterPriceValidator,
} from "./validators";

describe("Validator functions", () => {
	describe("emailValidator function", () => {
		it("returns true for valid email", () => {
			const result = emailValidator("test@test.com");
			expect(result).toEqual([true, ""]);
		});

		it("is not case sensitive", () => {
			const result = emailValidator("TeSt@tEST.cOm");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for invalid email", () => {
			const result = emailValidator("test");
			expect(result).toEqual([false, "Please enter a valid email"]);
		});

		it("returns false for empty email", () => {
			const result = emailValidator("");
			expect(result).toEqual([false, "Please enter an email"]);
		});
	});

	describe("nameValidator function", () => {
		it("returns true for a string more than 2 characters", () => {
			const result = nameValidator("test");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for invalid name", () => {
			const result = nameValidator("a");
			expect(result).toEqual([
				false,
				"Please enter a name with more than one character",
			]);
		});

		it("returns false for empty name", () => {
			const result = nameValidator("");
			expect(result).toEqual([false, "Please enter a name"]);
		});
	});

	describe("postalCodeValidator function", () => {
		it("returns true for a correctly formatted postal code with 5 numbers", () => {
			const result = postalCodeValidator("123 45");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for an incorrectly formatted postalCode with 5 characters", () => {
			const result = postalCodeValidator("12345");
			expect(result).toEqual([false, 'Postal code must have format "123 45"']);
		});

		it("returns false for a string with more than 5 characters", () => {
			const result = postalCodeValidator("123456");
			expect(result).toEqual([false, 'Postal code must have format "123 45"']);
		});

		it("returns false for a string containing letters", () => {
			const result = postalCodeValidator("incorrect");
			expect(result).toEqual([false, 'Postal code must have format "123 45"']);
		});

		it("returns false for an empty string", () => {
			const result = postalCodeValidator("");
			expect(result).toEqual([false, "Please enter a postal code"]);
		});
	});

	describe("cityValidator function", () => {
		it("returns true for a valid city string", () => {
			const result = cityValidator("San Francisco");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than 3 characters", () => {
			const result = cityValidator("SF");
			expect(result).toEqual([
				false,
				"Please enter a city with more than two characters",
			]);
		});

		it("returns false for an empty string", () => {
			const result = cityValidator("");
			expect(result).toEqual([false, "Please enter a city"]);
		});
	});

	describe("streetValidator function", () => {
		it("returns true for a valid street string", () => {
			const result = streetValidator("Cyber street 123");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than 3 characters", () => {
			const result = streetValidator("Lo");
			expect(result).toEqual([
				false,
				"Please enter a street with more than two characters",
			]);
		});

		it("returns false for an empty string", () => {
			const result = streetValidator("");
			expect(result).toEqual([false, "Please enter a street"]);
		});
	});

	describe("passwordValidator function", () => {
		it("returns true for a valid password string", () => {
			const result = passwordValidator("test1234");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than 5 characters", () => {
			const result = passwordValidator("test");
			expect(result).toEqual([
				false,
				"Password must have at least five characters",
			]);
		});

		it("returns false for an empty string", () => {
			const result = passwordValidator("");
			expect(result).toEqual([false, "Please enter a password"]);
		});
	});

	describe("passwordConfirmValidator function", () => {
		it("returns true for a valid password string", () => {
			const result = passwordConfirmValidator("test1234", "test1234");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than 5 characters", () => {
			const result = passwordConfirmValidator("test", "test");
			expect(result).toEqual([
				false,
				"Password must have at least five characters",
			]);
		});

		it("returns false if passwords do not match", () => {
			const result = passwordConfirmValidator("test123", "notmatching");
			expect(result).toEqual([false, "Please enter matching passwords"]);
		});
	});

	describe("posterTitle validator", () => {
		it("returns true for a valid title", () => {
			const result = posterTitleValidator("test");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than three characters", () => {
			const result = posterTitleValidator("te");
			expect(result).toEqual([
				false,
				"Please enter a title with more than two characters",
			]);
		});

		it("returns false for an empty title", () => {
			const result = posterTitleValidator("");
			expect(result).toEqual([false, "Please enter a title"]);
		});
	});

	describe("posterDescription validator", () => {
		it("returns true for a valid description", () => {
			const result = posterDescriptionValidator(
				"Description is a cool description for a description."
			);
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a string with less than three characters", () => {
			const result = posterDescriptionValidator("Wo");
			expect(result).toEqual([
				false,
				"Please enter a description with more than two characters",
			]);
		});

		it("returns false for an empty description", () => {
			const result = posterDescriptionValidator("");
			expect(result).toEqual([false, "Please enter a description"]);
		});
	});

	describe("posterPrice validator", () => {
		it("returns true for a valid price", () => {
			const result = posterPriceValidator(10);
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a price less than 0", () => {
			const result = posterPriceValidator(-10);
			expect(result).toEqual([false, "Please enter a price greater than 0"]);
		});
	});

	describe("posterCategory validator", () => {
		it("returns true for a valid category", () => {
			const result = posterCategoryValidator("category");
			expect(result).toEqual([true, ""]);
		});

		it("returns false for an empty category", () => {
			const result = posterCategoryValidator("");
			expect(result).toEqual([false, "Please enter a category"]);
		});

		it("returns false for a category with less than three characters", () => {
			const result = posterCategoryValidator("Kl");
			expect(result).toEqual([
				false,
				"Please enter a category with more than two characters",
			]);
		});

		it("returns false if category contains spaces", () => {
			const result = posterCategoryValidator("category with spaces");
			expect(result).toEqual([
				false,
				"Please enter a single word without spaces or special characters",
			]);
		});

		it("returns false if category contains special characters", () => {
			const result = posterCategoryValidator("category!!€");
			expect(result).toEqual([
				false,
				"Please enter a single word without spaces or special characters",
			]);
		});
	});

	describe("posterImageUrl validator", () => {
		it("returns true for a valid image url", () => {
			const result = posterImageUrlValidator(
				"https://www.google.com/image.png"
			);
			expect(result).toEqual([true, ""]);
		});

		it("returns false for an empty image url", () => {
			const result = posterImageUrlValidator("");
			expect(result).toEqual([false, "Please enter an image url"]);
		});

		it("returns false for an invalid url", () => {
			const result = posterImageUrlValidator("wrongurl/image");
			expect(result).toEqual([false, "Please enter a valid url"]);
		});
	});

	describe("posterInStock validator", () => {
		it("returns true for a positive number", () => {
			const result = posterInStockValidator(123);
			expect(result).toEqual([true, ""]);
		});

		it("returns false for a negative number", () => {
			const result = posterInStockValidator(-10);
			expect(result).toEqual([false, "In stock can't be a negative number"]);
		});
	});
});
