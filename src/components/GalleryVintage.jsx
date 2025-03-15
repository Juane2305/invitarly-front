import React from "react";



  const GalleryVintage = ({images}) => {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-[#FAF3E0]">
        <h2 className="text-4xl font-vintageText mb-8 text-center">Nosotros</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {images.map((img, index) => (
            <div
              key={img.index}
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