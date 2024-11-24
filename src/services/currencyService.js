// Define the fetch function outside of the hook
export async function fetchCurrencies() {
	const response = await fetch(
		"https://currency-exchange-api-eight.vercel.app/api/rates"
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
}

export async function convertCurrencyApi(fromCurrency, toCurrency, amount) {
	const response = await fetch(
		`https://currency-exchange-api-eight.vercel.app/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data.result; // Assuming the result is in the 'result' field
}
