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
        'fondo-elegante': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1740756038/dom_3024_x_1960_px_4_dtinwr_nabgfh.webp')",
        'fondo-verona': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1741620131/Invitacio%CC%81n_Vertical_Boda_Casamiento_Minimalista_Verde_y_Blanco_dlihnb.jpg')",
        'fondo-esmeralda': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1742341160/Fondo_de_Pantalla_Computador_Simple_Beige_18_gyfe4i.png')",
        'fondo-angelito': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1742416496/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_2_nc38q0.png')",
        'fondo-angelito-mobile': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1742417091/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_Video_para_celular_1_fsrcpy.png')",
        'fondo-rayitodeluz': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1742505157/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_12_qgtrxz.png')",
        'fondo-aurora': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1742511418/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_13_ddhytn.jpg')",
        'fondo-praga': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1743177445/eugenia-pankiv-1Bs2sZ9fD2Q-unsplash_1_vsk75q.jpg')",
        'fondo-praga-mobile': "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1743187752/Disen%CC%83o_sin_ti%CC%81tulo_11_apfyxl.jpg')",
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
        brushNames: ["Marck Script", 'cursive']
      },
    },
  },
  plugins: [],
}

