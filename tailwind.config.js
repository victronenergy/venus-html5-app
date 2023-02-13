const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  // we try to use the default theme as much as possible,
  // see https://tailwindcss.com/docs/theme
  theme: {
    extend: {
      screens: {
        sm: '540px',
        md: '800px',
        lg: '1400px',
        xl: '1800px',
        // custom media queries that also use the min-height property
        'sm-s' : {
          raw : '(min-width: 540px) and (min-height: 400px)'
        },
        'sm-m' : {
          raw : '(min-width: 540px) and (min-height: 550px)'
        },
        'sm-l' : {
          raw : '(min-width: 540px) and (min-height: 700px)'
        },
        'md-s' : {
          raw : '(min-width: 800px) and (min-height: 400px)'
        },
        'md-m' : {
          raw : '(min-width: 800px) and (min-height: 550px)'
        },
        'md-l' : {
          raw : '(min-width: 800px) and  (min-height: 700px)'
        },
        'lg-s' : {
          raw : '(min-width: 1400px) and (min-height: 400px)'
        },
        'lg-m' : {
          raw : '(min-width: 1400px) and (min-height: 550px)'
        },
        'lg-l' : {
          raw : '(min-width: 1400px) and (min-height: 700px)'
        },
        'xl-s' : {
          raw : '(min-width: 1800px) and (min-height: 400px)'
        },
        'xl-m' : {
          raw : '(min-width: 1800px) and (min-height: 550px)'
        },
        'xl-l' : {
          raw : '(min-width: 1800px) and (min-height: 700px)'
        },
      },
      colors: {
        victron: {
          lightGray: {
            DEFAULT: '#F5F5F5',
            dark: '#F5F5F5',
          },
          darkGray: {
            DEFAULT: '#141414',
            dark: '#141414',
          },
          gray: {
            DEFAULT: '#969591',
            dark: '#969591',
            "400": '#64635F',
            '300' : '#504F4B',
            "200": '#272622',
          },
          blue: {
            DEFAULT: '#387DC5',
            dark: '#387DC5',
          },
          red: {
            DEFAULT: '#F35C58',
            dark: '#F35C58',
          },
          cyan: {
            DEFAULT: '#84CBF8',
            dark: '#84CBF8',
          },
          purple: {
            DEFAULT: '#6B4AB3',
            dark: '#6B4AB3',
          },
          lime: {
            DEFAULT: '#76832C',
            dark: '#76832C',
          },
          green: {
            DEFAULT: '#72B84C',
            dark: '#72B84C',
          },
          slate: {
            DEFAULT: '#7F7F9C',
            dark: '#7F7F9C',
          },
          yellow: {
            DEFAULT: '#F0962E',
            dark: '#F0962E',
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-museo-sans)', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        full: '9999px',
        DEFAULT: '0.25rem',
      },
      strokeWidth: {
        '16': '16px',
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')],
}
