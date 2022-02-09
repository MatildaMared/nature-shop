export function saveToken(token: string) {
	localStorage.setItem("token", token);
}

export function getToken(): string | undefined {
	const item = localStorage.getItem("token");
	if (item) {
		return item;
	}
	return undefined;
}
