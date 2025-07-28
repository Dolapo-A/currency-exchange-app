import { useQuery } from "@tanstack/react-query";
import { getconversionHistoryApi } from "../services/currencyService";

export function useConversionHistory(currencyA, currencyB, period = 1) {
	const {
		data: history = { data: [] },
		error: queryError,
		isLoading,
	} = useQuery({
		queryKey: ["conversionhistory", currencyA, currencyB, period],
		queryFn: () => getconversionHistoryApi(currencyA, currencyB, period),
		enabled: !!currencyA && !!currencyB,
		staleTime: 1000 * 60 * 10,
		refetchInterval: 1000 * 60 * 60,
		retry: true,
	});

	return {
		history,
		queryError,
		isLoading,
	};
}
