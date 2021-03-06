export function emailValidator(email: string): [boolean, string] {
	if (email.length === 0) {
		return [false, "Please enter an email"];
	}
	const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (isValid) {
		return [true, ""];
	} else {
		return [false, "Please enter a valid email"];
	}
}

export function postalCodeValidator(postalCode: string): [boolean, string] {
	if (postalCode.length === 0) {
		return [false, "Please enter a postal code"];
	}
	const isValid = /^\d{3} \d{2}$/.test(postalCode);
	if (isValid) {
		return [true, ""];
	}
	return [false, 'Postal code must have format "123 45"'];
}

export function cityValidator(city: string): [boolean, string] {
	if (city.length === 0) {
		return [false, "Please enter a city"];
	} else if (city.length < 3) {
		return [false, "Please enter a city with more than two characters"];
	}
	return [true, ""];
}

export function passwordValidator(password: string): [boolean, string] {
	if (password.length === 0) {
		return [false, "Please enter a password"];
	}
	const isValid = password.length >= 5;
	if (!isValid) {
		return [false, "Password must have at least five characters"];
	} else {
		return [true, ""];
	}
}

export function passwordConfirmValidator(
	passwordConfirm: string,
	password: string | undefined
): [boolean, string] {
	if (password?.length === 0) {
		return [false, "Please confirm password"];
	} else if (passwordConfirm.length < 5) {
		return [false, "Password must have at least five characters"];
	}
	const isValid = password === passwordConfirm;
	if (!isValid) {
		return [false, "Please enter matching passwords"];
	} else {
		return [true, ""];
	}
}

export function nameValidator(name: string): [boolean, string] {
	if (name.length === 0) {
		return [false, "Please enter a name"];
	} else if (name.length < 2) {
		return [false, "Please enter a name with more than one character"];
	}

	return [true, ""];
}

export function streetValidator(street: string): [boolean, string] {
	if (street.length === 0) {
		return [false, "Please enter a street"];
	} else if (street.length < 3) {
		return [false, "Please enter a street with more than two characters"];
	}

	return [true, ""];
}

export function posterTitleValidator(title: string): [boolean, string] {
	if (title.length === 0) {
		return [false, "Please enter a title"];
	} else if (title.length < 3) {
		return [false, "Please enter a title with more than two characters"];
	}

	return [true, ""];
}

export function posterDescriptionValidator(
	description: string
): [boolean, string] {
	if (description.length === 0) {
		return [false, "Please enter a description"];
	} else if (description.length < 3) {
		return [false, "Please enter a description with more than two characters"];
	}

	return [true, ""];
}

export function posterCategoryValidator(category: string): [boolean, string] {
	if (category.length === 0) {
		return [false, "Please enter a category"];
	} else if (category.length < 3) {
		return [false, "Please enter a category with more than two characters"];
	}

	const isValid = /^[a-zA-Z0-9_]+$/.test(category);

	if (!isValid) {
		return [
			false,
			"Please enter a single word without spaces or special characters",
		];
	}

	return [true, ""];
}

export function posterImageUrlValidator(imageUrl: string): [boolean, string] {
	if (imageUrl.length === 0) {
		return [false, "Please enter an image url"];
	}

	const isValid =
		/(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/.test(
			imageUrl
		);

	if (!isValid) {
		return [false, "Please enter a valid url"];
	}

	return [true, ""];
}

export function posterPriceValidator(price: number): [boolean, string] {
	if (price <= 0) {
		return [false, "Please enter a price greater than 0"];
	}

	return [true, ""];
}

export function posterInStockValidator(inStock: number): [boolean, string] {
	if (inStock < 0) {
		return [false, "In stock can't be a negative number"];
	}

	return [true, ""];
}
