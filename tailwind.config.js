/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html,css}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Funnel Display"', 'system-ui', '-apple-system', 'sans-serif'],
				funnel: ['"Funnel Display"', 'serif'],
			},

			colors: {
				primary: "#007BFF",
				secondary: "#f59e0b",
				accent: "#f97316",
				background: "#f3f4f6",
				text: "#111827",
			},
		},
	},
	plugins: [],
};
