import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



export const GalleryPraga = ({images, text, sectionClass}) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (image) => {
    setSelectedImg(image);
  };

  const handleClose = () => {
    setSelectedImg(null);
  };

  return (
    <section className={`py-12 ${sectionClass}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {text}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.index}
              className="relative overflow-hidden rounded shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleOpen(img)}
            >
              <motion.img
                src={img.img}
                className="w-full h-72 object-cover object-center hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedImg && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleClose}
            >
              <motion.img
                src={selectedImg.img}
                className="max-w-full max-h-full object-contain p-4"
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
