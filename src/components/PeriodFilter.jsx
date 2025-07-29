/* eslint-disable react/prop-types */
function PeriodFilter({ value, onchange }) {
	if (!value || !onchange) return null;
	const options = [
		{ label: "7 days", value: 7 },
		// { label: "30 days", value: 30 },
		// { label: "3M", value: 90 },
		// { label: "6M", value: 180 },
		// { label: "1Y", value: 365 },
	];

	return (
		<>
			{options.map((option) =>
				option.value === 0 ? null : (
					<button
						key={option.value}
						className={`px-2 py-1 rounded-2xl lg:text-base text-sm border transition-colors duration-200 ${
							value === option.value
								? "bg-blue-600 text-white"
								: "bg-slate-200 hover:bg-slate-300"
						}`}
						onClick={() => onchange(option.value)}
					>
						{option.label}
					</button>
				)
			)}
		</>
	);
}

export default PeriodFilter;
