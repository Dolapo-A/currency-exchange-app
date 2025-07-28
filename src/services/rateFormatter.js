function formatRate(rate) {
	if (rate < 0.0001) return rate.toFixed(8);
	if (rate < 0.01) return rate.toFixed(6);
	if (rate < 1) return rate.toFixed(4);
	return rate.toFixed(2);
}

export default formatRate;