import { useState, useEffect } from "react";
import { ChevronDownIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { currencyFlag } from "./currencyFlag";
import CurrencyModal from "./components/CurrencyModal";

function App() {
	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("USD");
	const [availableCurrencies, setAvailableCurrencies] = useState([]);
	const [exchangeRate, setExchangeRate] = useState(null);
	const [convertedAmount, setConvertedAmount] = useState(null);
	const [isFromModalOpen, setIsFromModalOpen] = useState(false);
	const [isToModalOpen, setIsToModalOpen] = useState(false);
	const [connectionError, setConnectionError] = useState(false);

	useEffect(() => {
		const fetchRates = async () => {
			try {
				setConnectionError(false);
				const response = await fetch(
					"https://currency-exchange-api-eight.vercel.app/api/rates"
				);

				const data = await response.json();

				if (data && typeof data === "object") {
					setAvailableCurrencies(data);
				} else {
					console.error("Invalid data format received:", data);
					setConnectionError(true);
				}
			} catch (error) {
				console.error("Error fetching rates:", error);
				setConnectionError(true);
			}
		};
		fetchRates();
	}, []);

	useEffect(() => {
		const convertCurrency = async () => {
			// Reset values if amount is empty or 0
			if (!amount || amount <= 0) {
				setConvertedAmount(null);
				setExchangeRate(null);
				return;
			}

			// Handle same currency conversion
			if (fromCurrency === toCurrency) {
				setConvertedAmount(Number(amount));
				setExchangeRate(1);
				return;
			}

			try {
				setConnectionError(false);
				const response = await fetch(
					`https://currency-exchange-api-eight.vercel.app/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
				);

				if (!response.ok) {
					setConnectionError(true);
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log("Conversion response:", data);

				setConvertedAmount(data.result);
				setExchangeRate(data.result / data.amount);
			} catch (error) {
				console.error("Error converting currency:", error);
				setConnectionError(true);
				setConvertedAmount(null);
				setExchangeRate(null);
			}
		};

		// Add debounce to prevent too many API calls
		const timeoutId = setTimeout(convertCurrency, 500);
		return () => clearTimeout(timeoutId);
	}, [amount, fromCurrency, toCurrency]);

	// Add this function to handle swapping
	const handleSwapCurrencies = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	return (
		<>
			{/* Error Banner - Placed outside the main container */}
			{connectionError && (
				<div className="fixed inset-x-0 top-0 bg-red-500 text-white p-3 text-center z-50">
					<p className="text-sm">
						Unable to connect to the server. Please check your internet
						connection.
					</p>
				</div>
			)}

			<div className="max-w-lg mx-auto p-4 bg-white min-h-screen">
				{/* Title */}
				<h1 className="text-2xl font-semibold mb-2">Convert money</h1>
				<p className="text-gray-600 mb-6">
					Enter amount and select currency to convert to
				</p>

				{/* Amount Input Section */}
				<div className="mb-4">
					<label className="block text-gray-600 mb-2">Amount</label>
					<div className="p-4 rounded-2xl bg-white border border-gray-200 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<button
								className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full"
								onClick={() => setIsFromModalOpen(true)}
							>
								<img
									src={`/flags/${currencyFlag[
										fromCurrency
									]?.toLowerCase()}.png`}
									alt={fromCurrency}
									className="w-7 h-5 object-cover border border-gray-300 shadow-sm rounded"
									onError={(e) => {
										e.target.src = "/flags/default-flag.png";
									}}
								/>
								<span>{fromCurrency}</span>
								<ChevronDownIcon className="w-4 h-4 text-gray-400" />
							</button>
						</div>
						<input
							type="number"
							min="0"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="text-2xl text-right w-32 focus:outline-none"
							placeholder="0.00"
						/>
					</div>
				</div>

				{/* Swap Button */}
				<div className="flex justify-center -my-2 relative">
					<button
						onClick={handleSwapCurrencies}
						className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors"
					>
						<ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
					</button>
				</div>

				{/* Amount to Receive */}
				<div className="mb-6">
					<label className="block text-gray-600 mb-2">Converted Amount</label>
					<div className="p-4 rounded-2xl bg-white border border-gray-200 flex justify-between items-center">
						<button
							className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full"
							onClick={() => setIsToModalOpen(true)}
						>
							<img
								src={`/flags/${currencyFlag[toCurrency]?.toLowerCase()}.png`}
								alt={toCurrency}
								className="w-7 h-5 object-cover border border-gray-300 shadow-sm rounded"
								onError={(e) => {
									e.target.src = "/flags/default-flag.png";
									e.target.onerror = null;
								}}
							/>
							<span>{toCurrency}</span>
							<ChevronDownIcon className="w-4 h-4 text-gray-400" />
						</button>
						<span className="text-2xl text-gray-400">
							{convertedAmount
								? `${convertedAmount.toFixed(4)} ${toCurrency}`
								: `0.00 ${toCurrency}`}
						</span>
					</div>
				</div>

				{/* Conversion Details */}
				<div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
					<div className="flex justify-between">
						<span className="text-gray-600">Converting</span>
						<span>
							{amount || 0} {fromCurrency}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Exchange rate</span>
						<span>
							1 {fromCurrency} = {exchangeRate ? exchangeRate.toFixed(4) : "X"}{" "}
							{toCurrency}
						</span>
					</div>
				</div>

				{/* Add Currency Modals */}
				<CurrencyModal
					isOpen={isFromModalOpen}
					onClose={() => setIsFromModalOpen(false)}
					onSelect={setFromCurrency}
					currencies={availableCurrencies}
					selectedCurrency={fromCurrency}
				/>

				<CurrencyModal
					isOpen={isToModalOpen}
					onClose={() => setIsToModalOpen(false)}
					onSelect={setToCurrency}
					currencies={availableCurrencies}
					selectedCurrency={toCurrency}
				/>
			</div>
		</>
	);
}

export default App;
