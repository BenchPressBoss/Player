import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				primary: '#FA8A5D',
				dark: {
					border: '#41444E',
					100: '#A1A1A1',
					600: '#333847',
					700: '#282C37',
					800: '#1F2028'
				}
			}
		}
	},
	plugins: []
}
export default config
