

const PlantillasSection = () => {
  const plantillas = [
    {
      id: 1,
      nombre: 'Invitación Elegante',
      descripcion: 'Ideal para bodas y eventos formales.',
      imagen: 'https://res.cloudinary.com/dfschbyq2/image/upload/v1736698388/Dise%C3%B1o_sin_t%C3%ADtulo_12_f2sslz.png',
      link: '/plantillas/elegante'
    },
    {
      id: 2,
      nombre: 'Invitación Minimalista',
      descripcion: 'Diseño simple y sofisticado para cualquier evento.',
      imagen: 'https://res.cloudinary.com/dfschbyq2/image/upload/v1736698388/Dise%C3%B1o_sin_t%C3%ADtulo_12_f2sslz.png',
      link: '/plantillas/minimalista'
    },
    {
      id: 3,
      nombre: 'Invitación Divertida',
      descripcion: 'Perfecta para cumpleaños y celebraciones casuales.',
      imagen: 'https://res.cloudinary.com/dfschbyq2/image/upload/v1736698388/Dise%C3%B1o_sin_t%C3%ADtulo_12_f2sslz.png',
      link: '/plantillas/divertida'
    },
    {
      id: 4,
      nombre: 'Invitación Vintage',
      descripcion: 'Un estilo retro para los amantes de lo clásico.',
      imagen: 'https://res.cloudinary.com/dfschbyq2/image/upload/v1736698388/Dise%C3%B1o_sin_t%C3%ADtulo_12_f2sslz.png',
      link: '/plantillas/vintage'
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Plantillas</h2>
        <p className="text-gray-600 mb-12">
          Descubre nuestras plantillas diseñadas para todo tipo de eventos. Personalizables y únicas para ti.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plantillas.map((plantilla) => (
            <div
              key={plantilla.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={plantilla.imagen}
                alt={plantilla.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {plantilla.nombre}
                </h3>
                <p className="text-gray-600 mb-4">{plantilla.descripcion}</p>
                <a
                  href={plantilla.link}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantillasSection;
