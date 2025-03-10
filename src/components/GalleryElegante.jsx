import React, { useState } from "react";

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

const GalleryElegante = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 text-center text-white relative">
      <h2 className="text-3xl font-serif mb-4 text-[#D4AF37]">Nosotros</h2>

      <div className="relative border border-[#D4AF37] p-2 rounded-lg">
        {images.length > 0 && (
          <img
            src={images[current].img}
            alt={`Elegante ${current}`}
            // Forzar un tamaño uniforme (500px de alto) y ancho completo
            className="mx-auto w-full h-[500px] object-cover"
          />
        )}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-[#D4AF37] px-2 py-1 rounded"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-[#D4AF37] px-2 py-1 rounded"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default GalleryElegante;