/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'fondo-inicio': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1735597367/eb792da9-32cf-458d-ab1f-b21615d1953a_ieuwqb.jpg')",
        'fondo-banner': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1735580470/Agregar_un_t%C3%ADtulo-2_iz5elu.png')",
        'fondo-moderna': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1739833177/White_Digitalism_Basic_Simple_Presentation_ut9ade_puh4ph.jpg')",
        'fondo-tela' : "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1735580470/Agregar_un_t%C3%ADtulo-2_iz5elu.png')",
        'fondo-vintage' : "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1736862851/Frann_y_Mari_qmysm9.png')",
        'fondo-vintage': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1737037828/Disen%CC%83o_Elegante_gem3ut.png')",
        'fondo-elegante': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1739401939/dom_3024_x_1960_px_4_dtinwr.jpg')"
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
        modernaTitle: ['Montserrat', 'sans-serif'], // Títulos Moderna
        modernaText: ['Quicksand', 'sans-serif'], // Textos Moderna
        vintageTitle: ['Playfair Display', 'serif'], // Títulos Vintage
        vintageText: ['Cormorant Infant', 'serif'], // Textos Vintage
        eleganteTitle: ['Tangerine', 'cursive'], // Títulos Elegante
        eleganteText: ['Great Vibes', 'serif'], // Textos Elegante
      },
    },
  },
  plugins: [],
}

