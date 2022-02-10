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

export function postalCodeValidator(postalCode: string) {
	if (postalCode.length === 0) {
		return [false, "Please enter a postal code"];
	}
	const isValid = /^\d{3} \d{2}$/.test(postalCode);
	if (isValid) {
		return [true, ""];
	}
	return [false, 'Please enter a postal code in format "123 45"'];
}

export function cityValidator(city: string) {
	if (city.length === 0) {
		return [false, "Please enter a city"];
	} else if (city.length < 3) {
		return [false, "Please enter a valid city"];
	}
	return [true, ""];
}

export function passwordValidator(password: string): [boolean, string] {
	if (password.length === 0) {
		return [false, "Please enter a password"];
	}
	const isValid = password.length >= 5;
	if (!isValid) {
		return [false, "Password must be at least 5 characters"];
	} else {
		return [true, ""];
	}
}

export function nameValidator(name: string): [boolean, string] {
	if (name.length < 3) {
		return [false, "Please enter a name"];
	}

	return [true, ""];
}

export function streetValidator(street: string): [boolean, string] {
	if (street.length < 3) {
		return [false, "Please enter a street"];
	}

	return [true, ""];
}
