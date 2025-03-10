/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'fondo-inicio': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740754250/eb792da9-32cf-458d-ab1f-b21615d1953a_ieuwqb_1_knpxbq.webp')",
        'fondo-banner': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740754400/Agregar_un_ti%CC%81tulo-2_iz5elu_1_ipw8pe.webp')",
        'fondo-moderna': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740754490/White_Digitalism_Basic_Simple_Presentation_ut9ade_puh4ph_nhvice.webp')",
        'fondo-vintage' : "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740755645/Frann_y_Mari_qmysm9_vnvkax.webp')",
        'fondo-vintage': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740755815/Disen%CC%83o_Elegante_gem3ut_xq0rzs.webp')",
        'fondo-elegante': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740756038/dom_3024_x_1960_px_4_dtinwr_nabgfh.webp')"
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        'custom-bounce': 'custom-bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'custom-bounce': {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      },
      colors:{
        principal: 
        {
          light: '#d0bcab',
          dark: '#a8ad9a',
        },
        gold: "#c9a660",
      },
      fontFamily: {
        modernaTitle: ['Montserrat', 'sans-serif'], 
        modernaText: ['Quicksand', 'sans-serif'], 
        vintageTitle: ['Playfair Display', 'serif'], 
        vintageText: ['Cormorant Infant', 'serif'], 
        eleganteTitle: ['Tangerine', 'cursive'], 
        eleganteText: ['Great Vibes', 'serif'], 
      },
    },
  },
  plugins: [],
}

