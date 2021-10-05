module.exports = {
  mode: 'jit',
  corePlugins: {
    fontFamily: false,
  },
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        120: '1.2',
      },
      colors: {
        indigo: {
          650: '#4527a0',
        },
      },
      screens: {
        mobile: { min: '320px', max: '480px' },
        ipad: { min: '481px', max: '768px' },
        laptop: { min: '769px', max: '1024px' },
        desktop: { min: '1025px', max: '1200px' },
        tv: { min: '1201px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
