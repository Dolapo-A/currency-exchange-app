export async function userLocationApi() {
	const response = await fetch("https://ipapi.co/json/");
	if (!response.ok) {
		throw new Error("Failed to detect location");
	}
	return response.json();
}
