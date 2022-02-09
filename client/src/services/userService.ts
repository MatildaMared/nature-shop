export async function login(email: string, password: string) {
	const response = await fetch("/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();
	return data;
}

export async function getUser(token: string) {
	const response = await fetch("/api/users/getByToken", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}
