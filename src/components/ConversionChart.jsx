/* eslint-disable react/prop-types */
// components/ConversionChart.jsx
import {
	AreaChart,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Area,
} from "recharts";
import LoadingComponent from "./LoadingComponent";
import PeriodFilter from "./PeriodFilter";

export default function ConversionChart({
	data,
	base,
	quote,
	conversionRate,
	isLoading,
	period,
	setPeriod,
}) {
	if (isLoading)
		return (
			<div className="content-center">
				<LoadingComponent />
			</div>
		);
	if (!data || data.length === 0)
		return (
			<h2 className="content-center">
				{" "}
				<span className="text-xl">Graphy</span> is unavailable at the moment 🥲
			</h2>
		);

	return (
		<div className="w-full h-full p-4 flex flex-col">
			<div className="flex mb-2">
				<h1 className="text-2xl font-semibold">
					{`Rates from ${new Date(data[0].date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})} ― ${new Date(data[data.length - 1].date).toLocaleDateString(
						"en-US",
						{
							year: "numeric",
							month: "short",
							day: "numeric",
						}
					)}`}
				</h1>
			</div>
			<h3 className="text-base font-semibold mb-2 text-gray-500">
				{`1 ${base} = ${conversionRate.toFixed(4)} ${quote} (Last ${
					data.length
				} Days)`}
			</h3>
			<PeriodFilter value={period} onchange={setPeriod} />

			<div className="flex-1 min-h-0">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data}>
						<defs>
							<linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#007BFF" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="4" />
						<XAxis
							dataKey="date"
							tickFormatter={(d) =>
								new Date(d).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
								})
							}
							minTickGap={20}
						/>
						<YAxis
							domain={["auto", "auto"]}
							tickFormatter={(v) => v.toFixed(4)}
							width={70}
						/>
						<Tooltip
							formatter={(value) => value.toFixed(4)}
							cursorStyle={{ opacity: 0.1 }}
							labelFormatter={(label) =>
								`Date: ${new Date(label).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}`
							}
						/>

						<Area
							type="monotone"
							dataKey="value"
							stroke="#007BFF"
							strokeWidth={2}
							fillOpacity={1}
							fill="url(#colorRate)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
