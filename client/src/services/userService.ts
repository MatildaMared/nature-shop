import { NewUser } from "../models/User";

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

export async function signup(newUser: NewUser) {
	const response = await fetch("/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	});
	const data = await response.json();
	return data;
}

export async function updateUser(updates: {}, id: string, token: string) {
	const response = await fetch(`/api/users/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(updates),
	});
	const data = await response.json();
	return data;
}
