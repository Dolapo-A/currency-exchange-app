import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertCurrencyApi } from "../services/currencyService";

export function useConvertCurrency() {
	const queryClient = useQueryClient();

	const { mutate: convertCurrency, isLoading: isConverting } = useMutation({
		mutationFn: ({ fromCurrency, toCurrency, amount }) =>
			convertCurrencyApi(fromCurrency, toCurrency, amount),
		onSuccess: () => {
			// Optionally invalidate any related queries if needed
			queryClient.invalidateQueries({ queryKey: ["Rates"] });
		},
		onError: () => {
			console.error("error, unable to convert");
		},
	});

	return { convertCurrency, isConverting };
}
