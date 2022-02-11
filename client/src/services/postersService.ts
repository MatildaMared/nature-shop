import { NewPoster } from "../models/Poster";

export async function getAllPosters() {
	const response = await fetch("/api/products");
	const data = await response.json();
	return data;
}

export async function getPoster(id: string) {
	const response = await fetch(`/api/products/${id}`);
	const data = await response.json();
	return data;
}

export async function createPoster(newPoster: NewPoster, token: string) {
  console.log("newPoster in fetch", newPoster);
	const response = await fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(newPoster),
	});
	const data = await response.json();
	return data;
}
