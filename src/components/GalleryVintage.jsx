import React from "react";

const images = [
    {
      index: 1,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735527048/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_f9f5bf2b_ifsj5l.jpg",
    },
    {
      index: 2,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735527113/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.32_a25fd1b8_smbhnh.jpg",
    },
    {
      index: 3,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735526968/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_b8874616_i2bcnm.jpg",
    },
    {
      index: 4,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735508433/Dise%C3%B1o_sin_t%C3%ADtulo_6_xy3ozy.png",
    },
    {
      index: 5,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735526902/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_3d376287_napqll.jpg",
    },
    {
      index: 6,
      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735517155/8c881929-3182-4ac1-b38f-90aba216483f.png",
    },
  ];

  const GalleryVintage = () => {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-[#FAF3E0]">
        <h2 className="text-4xl font-vintageText mb-8 text-center">Nosotros</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {images.map((img, index) => (
            <div
              key={index}
              className="w-64 h-64 bg-white border-4 border-gold p-2 shadow-lg transform hover:rotate-1 transition-transform"
              style={{ 
                boxShadow: "2px 2px 10px rgba(0,0,0,0.2)"
              }}
            >
              <img
                src={img.img}
                alt={`Vintage ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default GalleryVintage;