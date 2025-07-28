/* eslint-disable react/prop-types */
function PeriodFilter({ value, onchange }) {
	if (!value || !onchange) return null;
	const options = [
		{ label: "7 days", value: 7 },
		{ label: "30 days", value: 30 },
		{ label: "3 months", value: 90 },
		{ label: "6 months", value: 180 },
		{ label: "1 year", value: 365 },
	];

	return (
		<div className="flex gap-2 mb-4">
			{options.map((option) => (
				<button
					key={option.value}
					className={`lg:px-4 px-2 py-1 rounded-2xl text-base border transition-colors duration-200 ${
						value === option.value
							? "bg-blue-600 text-white"
							: "bg-slate-200 hover:bg-slate-300"
					}`}
					onClick={() => onchange(option.value)}
                >{option.label}</button>
			))}
		</div>
	);
}

export default PeriodFilter;
