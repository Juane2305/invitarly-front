import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Verona from "../invitaciones/Verona";
import Tokyo from "../invitaciones/Tokyo";
import Roma from "../invitaciones/Roma";
import Berlin from "../invitaciones/Berlin";
import Esmeralda from "../invitaciones/Esmeralda";
import Aurora from "../invitaciones/Aurora";
import Angelito from "../invitaciones/Angelito";
import RayitoDeLuz from "../invitaciones/RayitoDeLuz";
import Praga from "../invitaciones/Praga";

const InvitacionPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/invitaciones/${slug}`);
        setData(res.data);
      } catch (err) {
        setError("Error al cargar la invitación");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No se encontró la invitación.</p>;

  switch (data.plantilla_elegida) {
    case "verona":
      return <Verona invitacionData={data} />;
    case "tokyo":
      return <Tokyo invitacionData={data} />;
    case "roma":
      return <Roma invitacionData={data} />;
    case "berlin":
        return <Berlin invitacionData={data}/>;
    case "esmeralda":
        return <Esmeralda invitacionData={data}/>;
    case "aurora":
        return <Aurora invitacionData={data}/>;
    case "angelito":
        return <Angelito invitacionData={data}/>;
    case "rayitodeluz":
        return <RayitoDeLuz invitacionData={data}/>;
    case "praga":
        return <Praga invitacionData={data}/>;
    default:
      return <p>La plantilla {data.plantilla} no está configurada.</p>;
  }
};

export default InvitacionPage;