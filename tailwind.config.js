/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp-dark': '#075E54',
        'whatsapp-medium': '#128C7E',
        'whatsapp-light': '#25D366',
        'whatsapp-bg': '#ECE5DD',
        'whatsapp-sent': '#DCF8C6',
        'whatsapp-received': '#FFFFFF',
      }
    },
  },
  plugins: [],
}