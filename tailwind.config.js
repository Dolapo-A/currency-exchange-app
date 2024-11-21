/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html,css}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Funnel Display"', 'system-ui', '-apple-system', 'sans-serif'],
				funnel: ['"Funnel Display"', 'serif'],
			}
		},
	},
	plugins: [],
};
